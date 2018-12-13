import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  row: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.grey[50]
    }
  }
})

class LeaderBoard extends Component {
  render() {
    const {players, classes} = this.props
    return (
      <Table padding="checkbox">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>Score</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map(p => (
            <TableRow key={p.id} className={classes.row} hover={true}>
              <TableCell>{`${p.lastName}, ${p.firstName}`}</TableCell>
              <TableCell numeric>{p.score}</TableCell>
              <TableCell numeric>
                <Button variant="outlined" color="secondary" size="small">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

export default withStyles(styles)(LeaderBoard)
