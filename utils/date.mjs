/**
 * getDaysInMonth Function
 *
 * Description:
 * Calculates the number of days in a given month and year.
 *
 * @param {number} month The month (0-indexed) for which to calculate the number of days.
 * @param {number} year The year for which to calculate the number of days.
 * @returns {number} The number of days in the specified month and year.
 */
export function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate()
}