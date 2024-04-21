import RequestError from "../error/RequestError.mjs"
import { isInteger, isDateString, hasTaskProperties } from "../request/dataEvaluation.mjs"
import { htmlEncode } from "./encode.mjs"
import Task from "../../model/Task.mjs"

/**
 * getMonthAndYearFromUrl Function
 *
 * Description:
 * Takes a search Parameter as input and extracts the month and year parameter.
 * It checks if the parameters are valid integers and within the specified range.
 *
 * @param {URLSearchParams} params The URLSearchParams object containing the query parameters.
 * @throws {RequestError} If the input is not valid.
 * @returns {Object} An object containing the extracted month and year as integers.
 */
export function getMonthAndYearFromUrl(params) {
    // Extract year and month params
    const month = params.get("month")
    const year = params.get("year")

    // check if url parameters are valid integers else throws an RequestError
    if(! (isInteger(month, 0, 12),  isInteger(year, 1900, 9999)) ) throw new RequestError()
    // parse url parameters to integer
    const monthInt = parseInt(month)
    const yearInt = parseInt(year)
    return { month: monthInt, year: yearInt }
}

/**
 * getStringFromUrl Function
 *
 * Description:
 * Takes a parameter name as input and extracts its value from the URLSearchParams.
 * It also sanitizes the value to prevent certain attacks.
 *
 * @param {URLSearchParams} params The URLSearchParams object containing the query parameters.
 * @param {String} parameter The name of the parameter to extract from the URL.
 * @returns {String} The sanitized parameter value as a string.
 */
export function getStringFromUrl(params, parameter) {
    // Extract parameter from params
    const value = params.get(parameter)
    const sanitizedValue = htmlEncode(value)
    return sanitizedValue
}

/**
 * getTaskFromRequest Function
 *
 * Description:
 * Used to parse a task request object from a JSON body to a valid Task object.
 * It checks if the task request object contains the necessary properties and that the values are valid.
 * It also implements security mechanisms to prevent certain attacks.
 *
 * @param {Object} taskRequest The JSON object representing the task request body.
 * @throws {RequestError} If the input is not valid.
 * @returns {Task} A Task object.
 */
export function getTaskFromRequest(taskRequest) {
    // Check if valid properties
    if (!hasTaskProperties(taskRequest)) throw new RequestError()

    // Check if properties are valid
    if (!(isDateString(taskRequest.date) && isInteger(taskRequest.id))) throw new RequestError()

    // Encode String
    taskRequest.title = htmlEncode(taskRequest.title)
    taskRequest.description = htmlEncode(taskRequest.description)

    // Create Task Object
    return new Task(Number.parseInt(taskRequest.id), taskRequest.title, taskRequest.description, new Date(taskRequest.date))
}

/**
 * getIdFromRequest Function
 *
 * Description:
 * Uses a possible ID from a request to check if it is a possible valid ID and returns it as an integer.
 *
 * @param {*} idRequest The ID value from the request.
 * @throws {RequestError} If the input is not valid.
 * @returns {number} The ID as an integer.
 */
export function getIdFromRequest(idRequest) {
    if(!isInteger(idRequest)) throw new RequestError()
    return parseInt(idRequest)
}