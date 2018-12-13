import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AddPersonIcon from '@material-ui/icons/PersonAdd'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  row: {
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.grey[50],
      boxShadow: '',
    },
  },
  tableWrapper: {
    overflow: 'auto',
    // height: '100%',
    // minHeight: '100%'
  },
})

const LeaderBoard = props => {
  const {players, classes, addNewPlayer, updatePlayer, removePlayer} = props
  return (
    <Paper className={classes.tableWrapper}>
      <Table padding="checkbox">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>Score</TableCell>
            <TableCell numeric>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={addNewPlayer}
              >
                New
                <AddPersonIcon size="small" style={{marginLeft: '5px'}} />
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.length > 0
            ? players.map(p => (
                <TableRow
                  key={p.id}
                  hover={true}
                  selected={p.selected}
                  className={classes.row}
                  onClick={updatePlayer(p.id)}
                >
                  <TableCell>{`${p.lastName}, ${p.firstName}`}</TableCell>
                  <TableCell numeric>{p.score}</TableCell>
                  <TableCell numeric>
                    <Button
                      size="small"
                      color="secondary"
                      variant="outlined"
                      onClick={removePlayer(p.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </Paper>
  )
}

LeaderBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNewPlayer: PropTypes.func.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
}

export default withStyles(styles)(LeaderBoard)
