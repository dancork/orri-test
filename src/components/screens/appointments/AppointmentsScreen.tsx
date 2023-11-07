import { useRecoilValue, useSetRecoilState } from 'recoil'
import Button from '@mui/material/Button'

import { EmptyState } from '../../EmptyState'
import { Screen } from '../../layout/Screen'
import { addScheduleDialogOpenState, hasSchedulesState } from '../../../store'

import { Calendar } from './Calendar'

export const AppointmentsScreen = () => {
  const hasSchedules = useRecoilValue(hasSchedulesState)
  const setIsOpen = useSetRecoilState(addScheduleDialogOpenState)

  return (
    <Screen p={0} display="flex" flexDirection="column">
      {hasSchedules ? (
        <Calendar />
      ) : (
        <EmptyState
          heading="No schedules"
          body="There are no appointments to display as currently there are no repeating schedules."
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
