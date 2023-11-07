import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import moment from 'moment-timezone'
import { useRecoilState } from 'recoil'

import Autocomplete from '@mui/material/Autocomplete'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Icon } from '../../assets/Icon'
import { calendarDateState, calendarTimeZoneState } from '../../../store'

export const CalendarToolbar = () => {
  const [start, setStart] = useRecoilState(calendarDateState)
  const [timeZone, setTimeZone] = useRecoilState(calendarTimeZoneState)

  const isCurrentWeek = start.isSame(moment(), 'week')

  const todayButton = (
    <Button
      variant="outlined"
      disabled={isCurrentWeek}
      onClick={() => setStart(moment().startOf('isoWeek'))}
      sx={{
        marginRight: 1.5,
      }}
    >
      Today
    </Button>
  )

  return (
    <>
      <Stack
        sx={{
          paddingX: 1,
          paddingY: [2, 1],
          marginBottom: 3,
          flexDirection: 'row',
          justifyContent: ['center', 'start'],
          alignItems: 'center',
          maxWidth: '100%',
          flexWrap: 'wrap',
          rowGap: 2,
        }}
      >
        {isCurrentWeek ? (
          todayButton
        ) : (
          <Tooltip title={moment().startOf('isoWeek').format('MMM Do')}>
            {todayButton}
          </Tooltip>
        )}

        <Stack direction="row" alignItems="center" sx={{ marginRight: 1 }}>
          <Tooltip title="Previous week">
            <IconButton
              onClick={() => setStart(c => c.clone().subtract({ weeks: 1 }))}
            >
              <Icon icon="arrow-left" fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next week">
            <IconButton
              onClick={() => setStart(c => c.clone().add({ weeks: 1 }))}
            >
              <Icon icon="arrow-right" fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography sx={{ marginRight: 4, flexShrink: 0 }}>
          {start.format('MMM Do')}
          {' - '}
          {start.clone().add({ days: 6 }).format('MMM Do')}
        </Typography>

        <Autocomplete
          id="timezone"
          options={Intl.supportedValuesOf('timeZone')}
          disableClearable
          renderInput={params => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
                'aria-label': 'Time zone',
                'aria-describedby': `By default will use your time zone ${moment.tz.guess()}`,
              }}
              sx={{ minWidth: '240px' }}
              size="small"
            />
          )}
          value={timeZone}
          onChange={(_event, newValue) => setTimeZone(newValue)}
        />
      </Stack>
    </>
  )
}
