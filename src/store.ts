import { atom, selector } from 'recoil'
import moment from 'moment-timezone'

import { Appointment, Day, Schedule } from './types'
import { isIsoWeekday, range } from './util'

export const addScheduleDialogOpenState = atom<boolean>({
  key: 'AddScheduleDialogOpen',
  default: false,
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

//  Uncomment below to use test data
// const testData: Schedule[] = [
//   {
//     startHour: 9,
//     startMin: 0,
//     endHour: 10,
//     endMin: 0,
//     subject: 'Tuesday',
//     day: 2,
//   },
//   {
//     startHour: 17,
//     startMin: 0,
//     endHour: 18,
//     endMin: 0,
//     subject: 'Weekday',
//     day: 10,
//     timeZone: 'Europe/Istanbul',
//   },
//   {
//     startHour: 0,
//     startMin: 0,
//     endHour: 1,
//     endMin: 0,
//     subject: 'Everyday',
//     day: 20,
//   },
// ]

export const scheduleListState = atom<Schedule[]>({
  key: 'ScheduleList',
  default: [],
})

export const hasSchedulesState = selector({
  key: 'HasSchedules',
  get: ({ get }) => {
    const scheduleList = get(scheduleListState)
    return Boolean(scheduleList.length)
  },
})

export const calendarDateState = atom({
  key: 'CalendarDate',
  default: moment().startOf('isoWeek'),
})

export const calendarTimeZoneState = atom<string>({
  key: 'CalendarTimeZone',
  default: moment.tz.guess(),
})

export const calendarState = selector({
  key: 'Calendar',
  get: ({ get }) => {
    const scheduleList = get(scheduleListState)
    const initalStart = get(calendarDateState)
    const calendarTimeZone = get(calendarTimeZoneState)

    const calendarStart = moment(initalStart).tz(calendarTimeZone, true)
    const calendarEnd = moment(calendarStart).add({ week: 1 })

    const defaultTimeZone = moment.tz.guess()

    const allAppointments = scheduleList.reduce((acc, schedule) => {
      const buildAppointment = (day: number): Appointment => {
        const start = moment(calendarStart)
          // convert to the schedule timezone but preserve the time so still 00:00 on monday
          .tz(schedule.timeZone ?? defaultTimeZone, true)
          // set the time and day of the week
          .set({
            hours: schedule.startHour,
            minutes: schedule.startMin,
            day,
          })
          // convert back to calendar timezone
          .tz(calendarTimeZone)

        const end = moment(calendarStart)
          // convert to the schedule timezone but preserve the time so still 00:00 on monday
          .tz(schedule.timeZone ?? defaultTimeZone, true)
          // set the time and day of the week
          .set({
            hours: schedule.endHour,
            minutes: schedule.endMin,
            day,
          })
          // convert back to calendar timezone
          .tz(calendarTimeZone)

        // if the appointment has shifted outside of the week window we need to adjust
        if (start.isBefore(calendarStart)) {
          start.add({ week: 1 })
          end.add({ week: 1 })
        } else if (start.isSameOrAfter(calendarEnd)) {
          start.subtract({ week: 1 })
          end.subtract({ week: 1 })
        }

        return {
          start,
          end,
          schedule,
        }
      }

      if (isIsoWeekday(schedule.day)) {
        acc.push(buildAppointment(schedule.day))
      } else if (schedule.day === Day.Weekday) {
        range(5).forEach(num => {
          acc.push(buildAppointment(num + 1))
        })
      } else if (schedule.day === Day.Everyday) {
        range(7).forEach(num => {
          acc.push(buildAppointment(num + 1))
        })
      }

      return acc
    }, [] as Appointment[])

    return range(7).map(day => {
      const date = calendarStart.clone().add({ day })
      const appointments = allAppointments
        .filter(appointment => appointment.start.isSame(date, 'day'))
        .toSorted((a, b) =>
          (a.start.isSame(b.start) && a.end.isBefore(b.end)) ||
          a.start.isBefore(b.start)
            ? -1
            : 1,
        )
      return { date, appointments }
    })
  },
})
