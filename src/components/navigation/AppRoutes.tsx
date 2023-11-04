import { Navigate, Route, Routes } from 'react-router-dom'

import { AppointmentsScreen } from '../screens/AppointmentsScreen'
import { SchedulesScreen } from '../screens/SchedulesScreen'
import { AddScheduleDialog } from '../dialogs/AddScheduleDialog'

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/appointments/*" Component={AppointmentsScreen} />
        <Route path="/schedules/*" Component={SchedulesScreen} />
        <Route index element={<Navigate to="/appointments" replace />} />
        {/* Replace this with 404 */}
        <Route path="*" element={null} />
      </Routes>

      <AddScheduleDialog />
    </>
  )
}
