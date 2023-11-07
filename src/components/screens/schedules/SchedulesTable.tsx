import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Typography } from '@mui/material'
import { useRecoilState } from 'recoil'

import { dayToFriendlyString, formatTime } from '../../../util'
import { Icon } from '../../assets/Icon'
import { scheduleListState } from '../../../store'
import moment from 'moment-timezone'

export const SchedulesTable = () => {
  const [scheduleList, setScheduleList] = useRecoilState(scheduleListState)
  const userTimeZone = moment.tz.guess()

  return (
    <>
      <TableContainer component={Paper} sx={{ marginBottom: 1 }}>
        <Table aria-label="Schedules">
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Frequency</TableCell>
              <TableCell>Timezone</TableCell>
              <TableCell width="44px"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduleList.map((schedule, index) => (
              <TableRow key={index}>
                <TableCell>{schedule.subject}</TableCell>
                <TableCell>
                  {formatTime(schedule.startHour, schedule.startMin)}
                </TableCell>
                <TableCell>
                  {formatTime(schedule.endHour, schedule.endMin)}
                </TableCell>
                <TableCell>{dayToFriendlyString(schedule.day)}</TableCell>
                <TableCell>
                  {schedule.timeZone ?? (
                    <Typography variant="inherit" fontStyle="italic">
                      * {userTimeZone}
                    </Typography>
                  )}
                </TableCell>
                <TableCell width="44px">
                  <Tooltip title="Delete schedule">
                    <IconButton
                      size="large"
                      onClick={() => {
                        setScheduleList(s => [
                          ...s.slice(0, index),
                          ...s.slice(index + 1),
                        ])
                      }}
                    >
                      <Icon icon="trash" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* TODO: Add pagination */}
        </Table>
      </TableContainer>
      <Typography variant="caption">
        * No time zone was specified so based on your computer settings we will
        use {userTimeZone}
      </Typography>
    </>
  )
}
