export enum Day {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Weekday = 10,
  Everyday = 20,
}

export type Schedule = {
  day: Day
  startHour: number
  startMin: number
  endHour: number
  endMin: number
  subject: string
  timeZone?: string
}
