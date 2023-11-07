import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline'
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { useRecoilValue } from 'recoil'

import { calendarState, calendarTimeZoneState } from '../../../store'
import { Icon } from '../../assets/Icon'
import { Tooltip } from '@mui/material'
import { formatTime } from '../../../util'
import moment from 'moment-timezone'

export const CalendarTimeline = () => {
  const data = useRecoilValue(calendarState)
  const timeZone = useRecoilValue(calendarTimeZoneState)

  const userTimeZone = moment.tz.guess()

  return (
    <Box
      sx={{
        display: [null, 'grid'],
        gridTemplateColumns: [null, 'repeat(7, minmax(200px, 1fr))'],
        flex: [null, 1],
      }}
    >
      {data.map(({ date, appointments }, index) => (
        <Box
          key={index}
          sx={{
            paddingX: [2, 0.5],
            borderLeftWidth: [null, index === 0 ? '0' : '1px'],
            borderLeftStyle: 'solid',
            borderLeftColor: 'grey.300',
          }}
        >
          <Stack
            sx={{
              paddingY: 2,
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" color="grey.800" fontWeight="light">
              {date.format('ddd')}
            </Typography>
            <Typography variant="h5" color="grey.800">
              {date.format('D')}
            </Typography>
          </Stack>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {appointments.map(({ start, end, schedule }, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" />
                  {index < appointments.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography fontWeight="500">{schedule.subject}</Typography>
                  <Typography variant="caption">
                    {start.format('HH:mm')}
                    {' - '}
                    {end.format('HH:mm')}
                  </Typography>
                  {(schedule.timeZone || userTimeZone !== timeZone) && (
                    <Tooltip
                      title={`${formatTime(
                        schedule.startHour,
                        schedule.startMin,
                      )} - ${formatTime(schedule.endHour, schedule.endMin)}`}
                    >
                      <Typography
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          color: 'grey.700',
                          cursor: 'default',
                        }}
                        variant="caption"
                      >
                        <Icon
                          icon="location-dot"
                          fontSize="inherit"
                          sx={{ mr: 0.5 }}
                        />
                        <Typography variant="inherit">
                          {schedule.timeZone ?? userTimeZone}
                        </Typography>
                      </Typography>
                    </Tooltip>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      ))}
    </Box>
  )
}
