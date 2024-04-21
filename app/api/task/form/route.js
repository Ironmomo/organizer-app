import { NextResponse } from "next/server"
import { getIdFromRequest, getStringFromUrl } from "@/utils/request/requestParser.mjs"
import SQLDBManager from "@/db/Manager/SQLDBManager.mjs"

/**
 * Get a task by id.
 * @route GET /api/task/form
 * @group Task - Operations about tasks.
 * @param {string} id.query.required - The id of the task to retrieve.
 */
export async function GET(req) {
    try {
        // Get the url parameters
        const params = req.nextUrl.searchParams
        // Parse the URLSearchParams
        let id = getStringFromUrl(params, 'id')
        id = getIdFromRequest(id)
        // Create DBManager
        const db = new SQLDBManager()
        // Fetch Data from db
        const result = await db.findTaskById(id)
        return NextResponse.json({ data: result }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: err.httpStatusCode || 500 })
    }
}