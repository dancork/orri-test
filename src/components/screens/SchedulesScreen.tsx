import { useRecoilValue, useSetRecoilState } from 'recoil'
import Button from '@mui/material/Button'

import { EmptyState } from '../EmptyState'
import { Screen } from '../layout/Screen'
import {
  addScheduleDialogOpenState,
  scheduleListState,
} from '../../store/schedule-state'

export const SchedulesScreen = () => {
  const schedules = useRecoilValue(scheduleListState)
  const setIsOpen = useSetRecoilState(addScheduleDialogOpenState)

  return (
    <Screen>
      {schedules.length ? (
        <div />
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
