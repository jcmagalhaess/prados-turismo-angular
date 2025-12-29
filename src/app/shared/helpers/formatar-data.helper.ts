export function formatarData(data: Date) {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

/**
 * Parses a date string (YYYY-MM-DD) as a local date to avoid timezone offset issues
 *
 * @param dateString - Date string in format "YYYY-MM-DD"
 * @returns Date object representing the local date
 */
export function parseDateLocal(dateString: string): Date {
    if (!dateString) return new Date();

    const [year, month, day] = dateString.split('T')[0].split('-').map(Number);
    // Create date using local timezone (month is 0-indexed)
    return new Date(year, month - 1, day);
}