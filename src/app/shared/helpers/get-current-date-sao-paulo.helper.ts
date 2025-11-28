/**
 * Gets the current date in São Paulo timezone formatted as YYYY-MM-DD
 * This ensures the date is correct for Brazil timezone (GMT-3)
 */
export function getCurrentDateSaoPaulo(): string {
    const date = new Date();

    // Convert to São Paulo timezone
    const saoPauloDate = new Date(date.toLocaleString('en-US', {
        timeZone: 'America/Sao_Paulo'
    }));

    const year = saoPauloDate.getFullYear();
    const month = String(saoPauloDate.getMonth() + 1).padStart(2, '0');
    const day = String(saoPauloDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
