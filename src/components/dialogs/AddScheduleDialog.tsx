import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

import { useRecoilState } from 'recoil'

import { addScheduleDialogOpenState } from '../../store/schedule-state'

export const AddScheduleDialog = () => {
  const [isOpen, setIsOpen] = useRecoilState(addScheduleDialogOpenState)

  const close = () => setIsOpen(false)

  // day: Day
  // startHour: number
  // startMin: number
  // endHour: number
  // endMin: number
  // subject: string

  return (
    <Dialog onClose={close} open={isOpen}>
      <DialogTitle>Add a new schedule</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel htmlFor="frequency">Frequency</InputLabel>
          <Select
            autoFocus
            // value={maxWidth}
            // onChange={handleMaxWidthChange}
            label="maxWidth"
            inputProps={{
              name: 'frequency',
              id: 'frequency',
            }}
          >
            <MenuItem value={1}>Monday</MenuItem>
            <MenuItem value={2}>Tuesday</MenuItem>
            <MenuItem value={3}>Wednesday</MenuItem>
            <MenuItem value={4}>Thursday</MenuItem>
            <MenuItem value={5}>Friday</MenuItem>
            <MenuItem value={10}>Weekdays</MenuItem>
            <MenuItem value={20}>Everyday</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            // margin="dense"
            label="Subject"
            fullWidth
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="inherit">
          Cancel
        </Button>
        <Button onClick={close}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}
