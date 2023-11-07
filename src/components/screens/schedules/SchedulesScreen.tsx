import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { EmptyState } from '../../EmptyState'
import { Screen } from '../../layout/Screen'
import { SchedulesTable } from './SchedulesTable'

import { addScheduleDialogOpenState, hasSchedulesState } from '../../../store'

export const SchedulesScreen = () => {
  const hasSchedules = useRecoilValue(hasSchedulesState)
  const setIsOpen = useSetRecoilState(addScheduleDialogOpenState)

  return (
    <Screen>
      {hasSchedules ? (
        <>
          <Stack
            mb={3}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="h1" variant="h5">
              Schedules
            </Typography>
            <Button variant="contained" onClick={() => setIsOpen(true)}>
              Add Schedule
            </Button>
          </Stack>
          <SchedulesTable />
        </>
      ) : (
        <EmptyState
          heading="No schedules"
          body="There are no repeating schedules setup."
          action={
            <Button variant="contained" onClick={() => setIsOpen(true)}>
              Add Schedule
            </Button>
          }
        />
      )}
    </Screen>
  )
}
