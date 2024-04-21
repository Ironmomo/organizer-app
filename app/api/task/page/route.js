import SQLDBManager from "@/db/Manager/SQLDBManager.mjs"
import { getStringFromUrl } from "@/utils/request/requestParser.mjs"
import { NextResponse } from "next/server"

/**
 * Retrieves a paginated list of tasks from the database.
 * This API Route supports paging to navigate through large datasets.
 * @function GET
 * @route GET /api/task/page
 * @param {Object} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise resolving to the response containing the paginated tasks.
 */
export async function GET(req) {
    try {
        // Get the url parameters month and year
        const params = req.nextUrl.searchParams
        // Parse the URLSearchParams
        const page = getStringFromUrl(params, 'page')
        // Create DBManager
        const dbm = new SQLDBManager()
        const data = await dbm.findAll(page)
        return NextResponse.json({ data }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: err.httpStatusCode || 500 })
    }
}