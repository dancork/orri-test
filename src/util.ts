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
