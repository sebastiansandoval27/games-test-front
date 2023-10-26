import { DateTime } from 'luxon'

export const parseDate = (date: Date) => {
  return DateTime.fromJSDate(date).toUTC().toLocaleString(DateTime.DATE_MED)
}
