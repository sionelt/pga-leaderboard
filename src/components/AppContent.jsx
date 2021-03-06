import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import validateFields from './../utils/validateFields'
import sortPlayers from './../utils/sortPlayers'
import Grid from '@material-ui/core/Grid'
import LeaderBoard from './LeaderBoard'
import DialogForm from './DialogForm'
import firebase from './../firebase'

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: theme.palette.grey[50],
  },
  container: {
    boxSizing: 'border-box',
    padding: theme.spacing.unit * 2,
  },
})

const validateDialogFields = data => {
  return validateFields(
    data,
    {
      firstName: 'required',
      lastName: 'required',
      score: 'required|integer',
    },
    {
      required: 'required!',
      integer: 'must be number!',
    },
  )
}

class AppContent extends Component {
  playerDefaults = {
    id: '',
    firstName: '',
    lastName: '',
    score: 0,
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    players: [],
    ajaxState: 'INIT',
    isDialogOpen: false,
    dialogFieldErrors: {},
    dialogTitle: 'Add New Player',
    selectedPlayer: {...this.playerDefaults},
  }

  componentDidMount() {
    this.setState({ajaxState: 'FETCHING'})
    this.getPlayers()
      .then(players => {
        this.setState({players, ajaxState: 'SUCCESS'})
      })
      .catch(err => {
        console.error(err)
        this.setState({ajaxState: 'FAIL'})
      })
  }

  getPlayers = () => {
    return firebase
      .database()
      .ref('Players/')
      .once('value')
      .then(snapshot => {
        const resData = snapshot.val()
        return resData
          ? Object.keys(resData).map(id => ({...resData[id], id}))
          : []
      })
  }

  addNewPlayer = () => {
    this.setState({
      isDialogOpen: true,
      dialogTitle: 'Add New Player',
      selectedPlayer: {...this.playerDefaults},
    })
  }

  updatePlayer = playerId => () => {
    this.setState(prev => ({
      isDialogOpen: true,
      dialogTitle: 'Update Player',
      selectedPlayer: prev.players.find(p => p.id === playerId),
    }))
  }

  removePlayer = playerId => async e => {
    e.stopPropagation()

    this.setState({ajaxState: 'FETCHING'})

    await firebase
      .database()
      .ref('Players/' + playerId)
      .remove()
      .catch(err => console.error(err))

    this.getPlayers()
      .then(players => this.setState({players, ajaxState: 'SUCCESS'}))
      .catch(err => {
        this.setState({ajaxState: 'FAIL'})
        console.error(err)
      })
  }

  onDialogFieldFocus = name => e => {
    if (name === 'score') {
      e.target.select()
    }
  }

  onDialogFieldChange = name => e => {
    const {value} = e.target
    const pair = {[name]: name === 'score' ? parseInt(value || 0) : value}
    const dialogFieldErrors = {...this.state.dialogFieldErrors}
    delete dialogFieldErrors[name]

    this.setState(prev => ({
      dialogFieldErrors,
      selectedPlayer: {...prev.selectedPlayer, ...pair},
    }))
  }

  onDialogClose = dialogAction => async () => {
    const {id, ...requestPlayer} = this.state.selectedPlayer
    const {isValid, errors} = validateDialogFields(requestPlayer)
    const defaultStates = {
      isDialogOpen: false,
      dialogFieldErrors: {},
      selectedPlayer: {...this.playerDefaults},
    }

    if (dialogAction === 'CLOSE') {
      return this.setState({...defaultStates})
    } else if (dialogAction === 'SAVE' && !isValid) {
      return this.setState({dialogFieldErrors: errors})
    }

    this.setState({ajaxState: 'FETCHING'})

    if (id) {
      await firebase
        .database()
        .ref('Players/' + id)
        .update(requestPlayer)
        .catch(err => {
          this.setState({ajaxState: 'FAIL'})
          console.error(err)
        })
    } else {
      await firebase
        .database()
        .ref('Players/')
        .push(requestPlayer)
        .catch(err => {
          this.setState({ajaxState: 'FAIL'})
          console.error(err)
        })
    }

    this.getPlayers()
      .then(players => {
        this.setState({
          players,
          ...defaultStates,
          ajaxState: 'SUCCESS',
        })
      })
      .catch(err => {
        this.setState({ajaxState: 'FAIL'})
        console.error(err)
      })
  }

  render() {
    const {classes} = this.props
    const {
      players,
      ajaxState,
      dialogTitle,
      isDialogOpen,
      selectedPlayer,
      dialogFieldErrors,
    } = this.state

    return (
      <Grid
        container
        justify="center"
        alignItems="stretch"
        className={classes.root}
      >
        <Grid item xs={12} sm={10} md={8} lg={6} className={classes.container}>
          <LeaderBoard
            ajaxState={ajaxState}
            isDialogOpen={isDialogOpen}
            players={sortPlayers(players)}
            removePlayer={this.removePlayer}
            addNewPlayer={this.addNewPlayer}
            updatePlayer={this.updatePlayer}
          />
        </Grid>
        <DialogForm
          title={dialogTitle}
          ajaxState={ajaxState}
          isOpen={isDialogOpen}
          player={selectedPlayer}
          onClose={this.onDialogClose}
          fieldErrors={dialogFieldErrors}
          onFieldFocus={this.onDialogFieldFocus}
          onFieldChange={this.onDialogFieldChange}
        />
      </Grid>
    )
  }
}

export default withStyles(styles)(AppContent)
