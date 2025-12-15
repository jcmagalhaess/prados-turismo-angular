/**
 * Formats a date string (YYYY-MM-DD) to ensure it's treated as São Paulo timezone
 * This prevents timezone offset issues when sending dates to the API
 *
 * @param year - Year as string or number
 * @param month - Month as string or number (1-12)
 * @param day - Day as string or number
 * @returns ISO string with São Paulo timezone offset (e.g., "2000-01-15T00:00:00-03:00")
 */
export function formatDateSaoPaulo(year: string | number, month: string | number, day: string | number): string {
    const yearStr = String(year);
    const monthStr = String(month).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');

    // Create date string in São Paulo timezone
    // Using T12:00:00-03:00 (noon) to avoid any edge cases with midnight
    return `${yearStr}-${monthStr}-${dayStr}T12:00:00-03:00`;
}

/**
 * Alternative: Format date as simple date string without time component
 * The API should handle this as a date-only field
 *
 * @param year - Year as string or number
 * @param month - Month as string or number (1-12)
 * @param day - Day as string or number
 * @returns Date string in format "YYYY-MM-DD"
 */
export function formatDateOnly(year: string | number, month: string | number, day: string | number): string {
    const yearStr = String(year);
    const monthStr = String(month).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');

    return `${yearStr}-${monthStr}-${dayStr}`;
}
