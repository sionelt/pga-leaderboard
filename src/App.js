import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TopAppBar from './components/AppBar'
import AppContent from './components/AppContent'

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
})

const App = props => (
  <div className={props.classes.root}>
    <TopAppBar />
    <AppContent />
  </div>
)

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
