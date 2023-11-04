import { atom } from 'recoil'
import { Day, Schedule } from '../types'

export const addScheduleDialogOpenState = atom<boolean>({
  key: 'AddScheduleDialogOpen',
  default: true,
})

export const DEFAULT_NEW_SCHEDULE: Schedule = {
  day: Day.Monday,
  startHour: 0,
  startMin: 0,
  endHour: 1,
  endMin: 0,
  subject: '',
  timeZone: undefined,
}

export const newScheduleState = atom<Schedule>({
  key: 'NewSchedule',
  default: { ...DEFAULT_NEW_SCHEDULE },
})

export const scheduleListState = atom<Schedule[]>({
  key: 'ScheduleList',
  default: [],
})
