import { Day } from './types'

export const keys = <O extends object, K extends keyof O = keyof O>(obj: O) =>
  Object.keys(obj) as K[]

export const enumKeys = <O extends object, K extends keyof O = keyof O>(
  obj: O,
) => Object.keys(obj).filter(k => isNaN(Number(k))) as K[]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isString = (input: any): input is string =>
  typeof input === 'string'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (input: any): input is string =>
  typeof input === 'number'

export const repeat = (char: string, times: number) =>
  Array(times).fill(char).join('')

export const zeropad = (number: number | string, length = 2) => {
  const asInt = isString(number) ? Number.parseInt(number) : Math.floor(number)
  if (!isNumber(number)) return ''

  const asString = asInt.toString()
  if (asString.length >= length) return asString

  return `${repeat('0', length - asString.length)}${asString}`
}

export const range = (length: number) =>
  Array(length)
    .fill(null)
    .map((_, index) => index)

export const formatTime = (hour: number, min: number) =>
  `${zeropad(hour)}:${zeropad(min)}`

export const isIsoWeekday = (day: Day) =>
  [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, Day.Friday].includes(
    day,
  )

export const compareDayValues = (a: Day, b: Day) =>
  [a, b].includes(Day.Everyday) ||
  (a === Day.Weekday && isIsoWeekday(b)) ||
  (b === Day.Weekday && isIsoWeekday(a)) ||
  a === b

export const dayToFriendlyString = (day: Day) => {
  switch (day) {
    case Day.Monday:
      return 'Mondays'
    case Day.Tuesday:
      return 'Tuesdays'
    case Day.Wednesday:
      return 'Wednesdays'
    case Day.Thursday:
      return 'Thursdays'
    case Day.Friday:
      return 'Fridays'
    case Day.Weekday:
      return 'Weekdays'
    case Day.Everyday:
      return 'Daily'
  }
}
