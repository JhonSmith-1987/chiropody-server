import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatTimeIn12Hour(seconds: number): string {
    return dayjs.unix(seconds).tz('America/Bogota').format('hh:mm a');
}