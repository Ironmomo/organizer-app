import { NextResponse } from "next/server"
import SQLDBManager from "@/db/Manager/SQLDBManager.mjs"
import { getMonthAndYearFromUrl, getTaskFromRequest, getIdFromRequest } from "@/utils/request/requestParser.mjs"

/**
 * Get all tasks of a given month and year.
 *
 * @function GET
 * @route GET /api/task
 * @param {Object} req - Incoming request object.
 * @returns {Promise<NextResponse>} - Promise that resolves with the response.
 */
export async function GET(req) {
    try {
        // Get the url parameters
        const params = req.nextUrl.searchParams
        // Parse the URLSearchParams to extract month and year
        const { month, year } = getMonthAndYearFromUrl(params)
        // Create a SQLDBManager instance
        const db = new SQLDBManager()
        // Fetch data from the database for the specified month and year
        const result = await db.findTasksByMonth(month, year)
        // Return JSON response with the fetched data
        return NextResponse.json({ data: result }, { status: 200 })
    } catch (err) {
        // Return JSON response with error message and appropriate status code
        return NextResponse.json({ message: err.message }, { status: err.httpStatusCode || 500 })
    }
}

/**
 * Update a task by task Object.
 *
 * @function POST
 * @param {Object} req - Incoming request object.
 * @returns {Promise<NextResponse>} - Promise that resolves with the response.
 */
export async function POST(req) {
    try {
        // Extract data from request
        const data = await req.json()
        // Parse request data to Task object
        const task = getTaskFromRequest(data)
        // Create a SQLDBManager instance
        const db = new SQLDBManager()
        // Update data in db
        const result = await db.updateTask(task)
        // Return JSON response with the updated data
        return NextResponse.json({ data: result }, { status: 200 })
    } catch (error) {
        // Return JSON response with error message and appropriate status code
        return NextResponse.json({ message: error.message }, { status: error.httpStatusCode || 500 })
    }
}

/**
 * Delete a task by ID.
 *
 * @function DELETE
 * @param {Object} req - Incoming request object.
 * @returns {Promise<NextResponse>} - Promise that resolves with the response.
 */
export async function DELETE(req) {
    try {
        // Extract data from request
        const data = await req.json()
        // Parse request data to extract ID
        const id = getIdFromRequest(data)
        // Create a SQLDBManager instance
        const db = new SQLDBManager()
        // Delete task from the database by ID
        const result = await db.deleteTaskById(id)
        // Return JSON response with the updated data
        return NextResponse.json({ data: result }, { status: 200 })
    } catch (error) {
        // Return JSON response with error message and appropriate status code
        return NextResponse.json({ message: error.message }, { status: error.httpStatusCode || 500 })
    }
}