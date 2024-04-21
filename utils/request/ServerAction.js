"use server"

import SQLDBManager from "@/db/Manager/SQLDBManager.mjs"
import { getTaskFromRequest } from "@/utils/request/requestParser.mjs"
import { isInteger } from "./dataEvaluation.mjs"
import RequestError from "../error/RequestError.mjs"
import { redirect } from "next/navigation"


/**
 * updateTask Server Action
 *
 * Description:
 * Receives form data to create a new task or update an existing task in the database.
 *
 * @param {*} formData The form data containing the task information.
 * @throws {RequestError} If the form data is not in the correct format.
 */
export async function updateTask(formData) {
    // Extract data from form
    const formRequest = {
        title: formData.get("title"),
        description: formData.get('description'),
        date: formData.get('date'),
        id: formData.get('id')
    }

    // Validate and parse data
    const task = getTaskFromRequest(formRequest)

    // Update existing task on db
    const dbm = new SQLDBManager()
    await dbm.updateTask(task)
}

/**
 * createTask Server Action
 *
 * Description:
 * Receives form data to create a new task in the database.
 *
 * @param {*} formData The form data containing the task information.
 * @throws {RequestError} If the form data is not in the correct format.
 */
export async function createTask(formData) {
    // Extract data from form
    const formRequest = {
        title: formData.get("title"),
        description: formData.get('description'),
        date: formData.get('date'),
        id: formData.get('id') || 0
    }

    // Validate and parse data
    const task = getTaskFromRequest(formRequest)
    
    // Create new Task on db
    const dbm = new SQLDBManager()
    await dbm.createTask(task.title, task.description, task.date)
}


/**
 * deleteTask Server Action
 *
 * Description:
 * Deletes a task identified by its ID from the database.
 *
 * @param {*} formData The form data containing the ID of the task to delete.
 * @throws {RequestError} If the form data is not in the correct format.
 */
export async function deleteTask(formData){
    // Extract data from form
    const formRequest = {
        id: formData.get('id')
    }

    // Validate data
    if (!isInteger(formRequest.id)) throw new RequestError()

    // Delete task in db
    const dbm = new SQLDBManager()
    await dbm.deleteTaskById(parseInt(formRequest.id))
}


/**
 * formAction Server Action
 *
 * Description:
 * Routes form data to either the createTask or updateTask action based on the "action" field in the form data.
 *
 * @param {*} formData The form data containing the action and task information.
 */
export async function formAction(formData) {
    // Extract data from form
    const actionRequest = formData.get('action')

    if (actionRequest === 'add') await createTask(formData)
    else if (actionRequest === 'update') await updateTask(formData)

    // redirect url to reload content
    redirect('/tasks/1')
}


/**
 * upcomingTasks Server Action
 *
 * Description:
 * Finds upcoming tasks ordered by date, with a default limit of 3 rows.
 *
 * @param {number} limit The maximum number of upcoming tasks to return.
 * @returns {Task[]} A list of Task objects.
 * @throws {DatabaseNoDataError} If no data has been found.
 * @throws {DatabaseError} If something went wrong with the database operation.
 */
export async function upcomingTasks() {
    // Get Data from db
    const dbm = new SQLDBManager()
    return dbm.findUpcomingTasks()
}
