import { useMemo } from 'react'
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
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'

import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  DEFAULT_NEW_SCHEDULE,
  addScheduleDialogOpenState,
  newScheduleState,
  scheduleListState,
} from '../../store/schedule-state'
import { Day } from '../../types'
import { enumKeys, zeropad } from '../../util'
import { FormHelperText } from '@mui/material'

export const AddScheduleDialog = () => {
  const setScheduleListState = useSetRecoilState(scheduleListState)
  const [isOpen, setIsOpen] = useRecoilState(addScheduleDialogOpenState)
  const [schedule, setSchedule] = useRecoilState(newScheduleState)
  const { day, startHour, startMin, endHour, endMin, subject, timeZone } =
    schedule

  const close = () => setIsOpen(false)

  const timeError = useMemo(
    () => startHour > endHour || (startHour === endHour && startMin > endMin),
    [startHour, startMin, endHour, endMin],
  )

  return (
    <Dialog onClose={close} open={isOpen}>
      <DialogTitle>Add a new schedule</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="frequency-label" required>
            Frequency
          </InputLabel>
          <Select
            id="frequency"
            labelId="frequency-label"
            label="Frequency"
            value={day}
            onChange={event =>
              setSchedule(s => ({ ...s, day: event.target.value as Day }))
            }
            required
          >
            {enumKeys(Day).map(day => (
              <MenuItem key={Day[day]} value={Day[day]}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          <Grid component={FormControl} item xs={6} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Start time"
              type="time"
              value={`${zeropad(startHour)}:${zeropad(startMin)}`}
              onChange={event => {
                const [hour, min] = event.target.value.split(':')
                setSchedule(s => ({
                  ...s,
                  startHour: Number.parseInt(hour),
                  startMin: Number.parseInt(min),
                }))
              }}
              required
              error={timeError}
            />
          </Grid>
          <Grid component={FormControl} item xs={6} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="End time"
              type="time"
              value={`${zeropad(endHour)}:${zeropad(endMin)}`}
              onChange={event => {
                const [hour, min] = event.target.value.split(':')
                setSchedule(s => ({
                  ...s,
                  endHour: Number.parseInt(hour),
                  endMin: Number.parseInt(min),
                }))
              }}
              required
              error={timeError}
            />
          </Grid>
        </Grid>
        {timeError && (
          <FormHelperText error>
            Start time must be before end time
          </FormHelperText>
        )}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField
            label="Subject"
            fullWidth
            value={subject}
            onChange={event =>
              setSchedule(s => ({ ...s, subject: event.target.value }))
            }
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Autocomplete
            disablePortal
            id="timezone"
            options={Intl.supportedValuesOf('timeZone')}
            renderInput={params => <TextField {...params} label="TimeZone" />}
            value={timeZone ?? null}
            onChange={(_event, newValue) =>
              setSchedule(s => ({ ...s, timeZone: newValue ?? undefined }))
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setSchedule({ ...DEFAULT_NEW_SCHEDULE })
            close()
          }}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          disabled={timeError || !subject}
          onClick={() => {
            setScheduleListState(list => [...list, schedule])
            setSchedule({ ...DEFAULT_NEW_SCHEDULE })
            close()
          }}
        >
          Add Schedule
        </Button>
      </DialogActions>
    </Dialog>
  )
}
