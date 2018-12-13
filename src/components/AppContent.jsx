import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import LeaderBoard from './LeaderBoard'
import DialogForm from './DialogForm'
import uuidv4 from 'uuid/v4'
import validateFields from './../utils/validateFields'
import sortPlayers from './../utils/sortPlayers'

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
  playerProps = {
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
    isDialogOpen: false,
    dialogFieldErrors: {},
    dialogTitle: 'Add New Player',
    selectedPlayer: {...this.playerProps},
  }

  addNewPlayer = () => {
    this.setState({
      isDialogOpen: true,
      dialogTitle: 'Add New Player',
      selectedPlayer: {...this.playerProps},
    })
  }

  updatePlayer = playerId => () => {
    this.setState(prev => ({
      isDialogOpen: true,
      dialogTitle: 'Update Player',
      selectedPlayer: prev.players.find(p => p.id === playerId),
    }))
  }

  removePlayer = playerId => e => {
    e.stopPropagation()
    this.setState(prev => ({
      players: prev.players.filter(p => p.id !== playerId),
    }))
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

  onDialogClose = dialogAction => () => {
    return this.setState(prev => {
      const {isValid, errors} = validateDialogFields(prev.selectedPlayer)

      if (dialogAction === 'SAVE' && !isValid) {
        return {dialogFieldErrors: errors}
      }

      const {id} = prev.selectedPlayer
      const updatedPlayers =
        id !== ''
          ? prev.players.map(p => (p.id === id ? {...prev.selectedPlayer} : p))
          : [...prev.players, {...prev.selectedPlayer, id: uuidv4()}]

      return {
        isDialogOpen: false,
        dialogFieldErrors: {},
        selectedPlayer: {...this.playerProps},
        players: dialogAction === 'SAVE' ? updatedPlayers : prev.players,
      }
    })
  }

  render() {
    const {classes} = this.props
    const {
      players,
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
            players={sortPlayers(players)}
            removePlayer={this.removePlayer}
            addNewPlayer={this.addNewPlayer}
            updatePlayer={this.updatePlayer}
          />
        </Grid>
        <DialogForm
          title={dialogTitle}
          isOpen={isDialogOpen}
          player={selectedPlayer}
          onClose={this.onDialogClose}
          fieldErrors={dialogFieldErrors}
          onFieldChange={this.onDialogFieldChange}
        />
      </Grid>
    )
  }
}

export default withStyles(styles)(AppContent)
