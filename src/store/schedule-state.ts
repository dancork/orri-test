import { atom } from 'recoil'
import { Schedule } from '../types'

export const addScheduleDialogOpenState = atom<boolean>({
  key: 'AddScheduleDialogOpen',
  default: false,
})

export const scheduleListState = atom<Schedule[]>({
  key: 'ScheduleList',
  default: [],
})
