import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

const DialogForm = props => {
  const LABELS = ['First Name', 'Last Name', 'Score']
  const {
    isOpen,
    player,
    title,
    onClose,
    ajaxState,
    fieldErrors,
    onFieldFocus,
    onFieldChange,
  } = props

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {Object.keys(player)
          .filter(k => k !== 'id')
          .map((k, i) => (
            <TextField
              id={k}
              key={k}
              name={k}
              margin="dense"
              label={LABELS[i]}
              value={player[k]}
              error={k in fieldErrors}
              onFocus={onFieldFocus(k)}
              onChange={onFieldChange(k)}
              autoFocus={k === 'firstName'}
              type={k === 'score' ? 'number' : 'text'}
              inputProps={k === 'score' ? {min: 0} : {}}
              helperText={k in fieldErrors && fieldErrors[k][0]}
              required
              fullWidth
            />
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose('CLOSE')} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose('SAVE')} color="primary">
          {ajaxState === 'FETCHING' ? (
            <CircularProgress size={20} thickness={3.6} />
          ) : (
            'Save'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DialogForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
  ajaxState: PropTypes.oneOf(['INIT', 'FETCHING', 'SUCCESS', 'FAIL'])
    .isRequired,
  title: PropTypes.oneOf(['Add New Player', 'Update Player']).isRequired,
  fieldErrors: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default DialogForm
