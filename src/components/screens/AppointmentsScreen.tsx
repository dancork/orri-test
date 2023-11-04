import { useSetRecoilState } from 'recoil'
import Button from '@mui/material/Button'

import { EmptyState } from '../EmptyState'
import { Screen } from '../layout/Screen'
import { addScheduleDialogOpenState } from '../../store/schedule-state'

export const AppointmentsScreen = () => {
  const setIsOpen = useSetRecoilState(addScheduleDialogOpenState)
  return (
    <Screen>
      <EmptyState
        heading="No appointments"
        body="There are no appointments setup during this period."
        action={
          <Button variant="outlined" onClick={() => setIsOpen(true)}>
            Add Schedule
          </Button>
        }
      />
    </Screen>
  )
}
