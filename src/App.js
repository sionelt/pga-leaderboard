import React, {Fragment} from 'react'
import {withStyles} from '@material-ui/core/styles'
import TopAppBar from './components/AppBar'
import AppContent from './components/AppContent'

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  }
})
const App = props => (
  <div className={props.classes.root}>
    <TopAppBar />
    <AppContent />
  </div>
)

export default withStyles(styles)(App)
