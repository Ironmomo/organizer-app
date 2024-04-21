import { NextResponse } from "next/server"
import SQLDBManager from "@/db/Manager/SQLDBManager.mjs"
import { getStringFromUrl } from "@/utils/request/requestParser.mjs"


/**
 * Get all tasks including the search pattern inside title or description.
 * The search pattern has to be provided via a URL parameter called 'search' (e.g., ?search=catchphrase).
 *
 * @function GET
 * @route GET /api/task/searchBy
 * @param {Object} req - Incoming request object.
 * @returns {Promise<NextResponse>} - Promise that resolves with the response.
 */
export async function GET(req) {
    try {
        // Get the url parameters month and year
        const params = req.nextUrl.searchParams
        // Parse the URLSearchParams to extract the search pattern
        const searchPattern = getStringFromUrl(params, 'search')
        // Create a SQLDBManager instance
        const dbm = new SQLDBManager()
        // Find tasks by search pattern in title or description
        const data = await dbm.findTaskByString(searchPattern)
        // Return JSON response with the fetched data
        return NextResponse.json({ data }, { status: 200 })
    } catch (err) {
        // Return JSON response with error message and appropriate status code
        return NextResponse.json({ message: err.message }, { status: err.httpStatusCode || 500 })
    }
}