import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone'; // Importamos el plugin de timezone
import utc from 'dayjs/plugin/utc'; // Importamos el plugin de utc

// Extender dayjs con los plugins necesarios
dayjs.extend(utc);
dayjs.extend(timezone);

export function getCurrentTimeInSeconds() {
    return dayjs().tz('America/Bogota').unix();
}