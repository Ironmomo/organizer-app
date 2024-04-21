/**
 * DatabaseError Class
 *
 * Description:
 * This class represents an error related to database operations. It extends the ErrorMsg class and sets a specific error code for database errors.
 *
 * @class DatabaseError
 * @extends {ErrorMsg}
 */

import ErrorMsg from "./ErrorMsg.mjs"
import { errorCodes } from "./error-codes.mjs"

export default class DatabaseError extends ErrorMsg {

    constructor() {
        super(errorCodes.DATABASE_ERROR)
        this.httpStatusCode = 500
    }

}