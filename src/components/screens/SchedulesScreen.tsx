import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { EmptyState } from '../EmptyState'
import { Screen } from '../layout/Screen'
import {
  addScheduleDialogOpenState,
  scheduleListState,
} from '../../store/schedule-state'
import { zeropad } from '../../util'
import { Typography } from '@mui/material'
import { Icon } from '../assets/Icon'

export const SchedulesScreen = () => {
  const schedules = useRecoilValue(scheduleListState)
  const setIsOpen = useSetRecoilState(addScheduleDialogOpenState)

  return (
    <Screen>
      {schedules.length ? (
        <>
          <Stack mb={3} direction="row" justifyContent="space-between">
            <Typography component="h1" variant="h5">
              Schedules
            </Typography>
            <Button variant="contained" onClick={() => setIsOpen(true)}>
              Add Schedule
            </Button>
          </Stack>
          <TableContainer component={Paper}>
            <Table aria-label="Schedules">
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Frequency</TableCell>
                  <TableCell>Timezone</TableCell>
                  <TableCell width="88px"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((schedule, index) => (
                  <TableRow key={index}>
                    <TableCell>{schedule.subject}</TableCell>
                    <TableCell>
                      {`${zeropad(schedule.startHour)}:${zeropad(
                        schedule.startMin,
                      )}`}
                    </TableCell>
                    <TableCell>
                      {`${zeropad(schedule.endHour)}:${zeropad(
                        schedule.endMin,
                      )}`}
                    </TableCell>
                    <TableCell>{schedule.day}</TableCell>
                    <TableCell>
                      {schedule.timeZone ?? (
                        <Typography variant="inherit" fontStyle="italic">
                          Default
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell width="88px">
                      <IconButton aria-label="Edit schedule" size="small">
                        <Icon icon="edit" fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="Delete schedule" size="small">
                        <Icon icon="trash" fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <EmptyState
          heading="No schedules"
          body="There are no repeating schedules setup."
          action={
            <Button variant="outlined" onClick={() => setIsOpen(true)}>
              Add Schedule
            </Button>
          }
        />
      )}
    </Screen>
  )
}
