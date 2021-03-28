export const calcMs = days => {
  return 1000 * 60 * 60 * 24 * days
}

export const multiplyIntoMs = () => x => {
  return x * 1000
}

export const getMsFromSecs = multiplyIntoMs()
export const getOneMinInMs = () => getMsFromSecs(60)

export const getMsFromMins = minutes => minutes * getOneMinInMs()
export const getOneHourInMs = () => getMsFromMins(60)

export const getMsFromHours = hours => hours * getOneHourInMs()
export const getOneDayInMs = () => getMsFromHours(24)

export const getMsFromDays = days => days * getOneDayInMs()
