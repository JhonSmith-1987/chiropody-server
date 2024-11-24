import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/es'; // Asegúrate de importar el idioma español

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es'); // Configura el idioma a español

// Función para obtener el timestamp actual en segundos
export function getCurrentTimestampToSeconds(): number {
    return dayjs().tz('America/Bogota').unix();
}

// Función para formatear la fecha en español
export function formatDateInSpanish(seconds: number): string {
    return dayjs.unix(seconds).tz('America/Bogota').format('D [de] MMMM [de] YYYY');
}


export function formatTimeIn12Hour(seconds: number): string {
    return dayjs.unix(seconds).tz('America/Bogota').format('hh:mm a');
}