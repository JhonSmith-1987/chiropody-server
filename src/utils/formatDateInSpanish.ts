import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDateInSpanish(seconds: number): string {
    return dayjs.unix(seconds).tz('America/Bogota').format('D [de] MMMM [de] YYYY');
}