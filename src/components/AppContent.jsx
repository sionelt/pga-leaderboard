import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LeaderBoard from './LeaderBoard'

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: theme.palette.grey[50]
  },
  container: {
    boxSizing: 'border-box',
    padding: theme.spacing.unit * 2
  },
  tableWrapper: {
    overflow: 'auto'
    // height: '100%',
    // minHeight: '100%'
  }
})

class AppContent extends Component {
  state = {
    players: [
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      },
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      },
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      },
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      },
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      },
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      },
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      },
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      },
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      },
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      },
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      },
      {
        id: '123',
        firstName: 'Tony',
        lastName: 'Finau',
        score: 123
      }
    ]
  }

  render() {
    const {classes} = this.props
    const {players} = this.state
    return (
      <Grid
        container
        justify="center"
        alignItems="stretch"
        className={classes.root}
      >
        <Grid item xs={12} sm={10} md={8} lg={6} className={classes.container}>
          <Paper className={classes.tableWrapper}>
            <LeaderBoard players={players} />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(AppContent)
