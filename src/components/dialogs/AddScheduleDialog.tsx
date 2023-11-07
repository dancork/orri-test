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
import FormHelperText from '@mui/material/FormHelperText'

import { useRecoilState } from 'recoil'
import moment from 'moment-timezone'

import {
  DEFAULT_NEW_SCHEDULE,
  addScheduleDialogOpenState,
  newScheduleState,
  scheduleListState,
} from '../../store'
import { Day } from '../../types'
import { compareDayValues, enumKeys } from '../../util'

export const AddScheduleDialog = () => {
  const [scheduleList, setScheduleList] = useRecoilState(scheduleListState)
  const [isOpen, setIsOpen] = useRecoilState(addScheduleDialogOpenState)
  const [newSchedule, setNewSchedule] = useRecoilState(newScheduleState)

  // creating moments to use for formatting and comparison
  // not included time zone but that would be something to consider in the future
  // because it can compare across them
  const startMoment = useMemo(
    () =>
      moment({
        hours: newSchedule.startHour,
        minutes: newSchedule.startMin,
      }),
    [newSchedule.startHour, newSchedule.startMin],
  )
  const endMoment = useMemo(
    () =>
      moment({
        hours: newSchedule.endHour,
        minutes: newSchedule.endMin,
      }),
    [newSchedule.endHour, newSchedule.endMin],
  )

  const timeError = useMemo(() => {
    if (startMoment.isSameOrAfter(endMoment)) {
      return 'Start time must be before end time'
    }
    if (
      scheduleList.some(schedule => {
        // for now we only compare same timezone
        // theoretically could use moment to compare across timezones
        if (schedule.timeZone !== newSchedule.timeZone) return false
        if (!compareDayValues(newSchedule.day, schedule.day)) return false

        // create moments to use for comparison
        const compareStartMoment = moment({
          hours: schedule.startHour,
          minutes: schedule.startMin,
        })
        const compareEndMoment = moment({
          hours: schedule.endHour,
          minutes: schedule.endMin,
        })

        // checks for overlap
        return (
          startMoment.isBetween(
            compareStartMoment,
            compareEndMoment,
            undefined,
            '[)',
          ) ||
          endMoment.isBetween(
            compareStartMoment,
            compareEndMoment,
            undefined,
            '(]',
          ) ||
          (startMoment.isBefore(compareStartMoment) &&
            endMoment.isAfter(compareEndMoment))
        )
      })
    ) {
      return 'Times cannot overlap an existing schedule'
    }

    // no error
    return null
  }, [newSchedule, scheduleList, startMoment, endMoment])

  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
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
            value={newSchedule.day}
            onChange={event =>
              setNewSchedule(s => ({ ...s, day: event.target.value as Day }))
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
              value={startMoment.format('HH:mm')}
              onChange={event => {
                const [hour, min] = event.target.value.split(':')
                setNewSchedule(s => ({
                  ...s,
                  startHour: Number.parseInt(hour),
                  startMin: Number.parseInt(min),
                }))
              }}
              required
              error={timeError !== null}
            />
          </Grid>
          <Grid component={FormControl} item xs={6} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="End time"
              type="time"
              value={endMoment.format('HH:mm')}
              onChange={event => {
                const [hour, min] = event.target.value.split(':')
                setNewSchedule(s => ({
                  ...s,
                  endHour: Number.parseInt(hour),
                  endMin: Number.parseInt(min),
                }))
              }}
              required
              error={timeError !== null}
            />
          </Grid>
        </Grid>
        {timeError !== null && (
          <FormHelperText error>{timeError}</FormHelperText>
        )}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <TextField
            label="Subject"
            fullWidth
            value={newSchedule.subject}
            onChange={event =>
              setNewSchedule(s => ({ ...s, subject: event.target.value }))
            }
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Autocomplete
            id="timezone"
            options={Intl.supportedValuesOf('timeZone')}
            renderInput={params => (
              <TextField
                {...params}
                fullWidth
                label="Time zone"
                helperText={`Defaults to your timezone ${moment.tz.guess()}`}
              />
            )}
            value={newSchedule.timeZone ?? null}
            onChange={(_event, newValue) =>
              setNewSchedule(s => ({ ...s, timeZone: newValue ?? undefined }))
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setNewSchedule({ ...DEFAULT_NEW_SCHEDULE })
            setIsOpen(false)
          }}
          sx={{
            borderRadius: 2,
          }}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          disabled={timeError !== null || !newSchedule.subject}
          sx={{
            borderRadius: 2,
          }}
          onClick={() => {
            setScheduleList(list => [...list, newSchedule])
            setNewSchedule({ ...DEFAULT_NEW_SCHEDULE })
            setIsOpen(false)
          }}
        >
          Add Schedule
        </Button>
      </DialogActions>
    </Dialog>
  )
}
