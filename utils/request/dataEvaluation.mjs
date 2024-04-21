/**
 * isInteger Function
 *
 * Description:
 * Checks if a value is an integer. If min and max are provided, it checks if the value is within the given range.
 *
 * @param {*} value The value to check if it's an integer.
 * @param {number} min The minimum value of the range (inclusive).
 * @param {number} max The maximum value of the range (exclusive).
 * @returns {boolean} True if the value is an integer and within the specified range, false otherwise.
 */
export function isInteger(value, min = undefined, max = undefined) {
    // Checks if the value can be converted to a number
    if (Number.isNaN(parseInt(value))) return false
    // Checks if the value can be a floating point number
    if (String(value).match(/[.|,]/)) return false

    const number = Number.parseInt(value)
    return (min !== undefined &&  max !== undefined) ? (number >= min && number < max) : true
}

/**
 * isDateString Function
 *
 * Description:
 * Checks if the input is a valid date string.
 *
 * @param {String} dateString The string to check if it can be parsed to a valid date.
 * @returns {boolean} True if the string can be parsed to a valid date, false otherwise.
 */
export function isDateString(dateString) {
    return !isNaN(new Date(dateString).getTime())
}

/**
 * hasTaskProperties Function
 *
 * Description:
 * Checks if the object contains the properties of a Task Object.
 *
 * @param {Object} obj The object to check for task properties.
 * @returns {boolean} True if the object contains the required properties of a Task Object, false otherwise.
 */
export function hasTaskProperties(obj) {
    return (
        'id' in obj &&
        'title' in obj &&
        'date' in obj &&
        'description' in obj
    )
}