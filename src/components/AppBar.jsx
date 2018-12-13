import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  heading: {
    justifyContent: 'center'
  }
})

const TopAppBar = props => (
  <AppBar position="static" color="primary">
    <Toolbar className={props.classes.heading}>
      <Typography variant="h6" color="inherit">
        PGA Players LeaderBoard
      </Typography>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(TopAppBar)
