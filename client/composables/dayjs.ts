import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'

export const useDayjs = () => {
  dayjs.extend(relativeTime)
  return dayjs
}
