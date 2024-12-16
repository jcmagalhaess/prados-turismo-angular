
/**
 * Generate a list of years, from the current year to a given start year
 * @param {number} startYear - The year to start the list from
 * @returns {number[]} - A list of years from the current year to the start year
 */
export function yearList(startYear: number) {
    const currentYear = new Date().getFullYear();
    let years = [];// empty array to store years

    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }
    
    return years;
}