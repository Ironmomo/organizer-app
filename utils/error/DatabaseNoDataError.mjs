/**
 * DatabaseNoDataError Class
 *
 * Description:
 * This class represents an error related to database operations when no data is found. 
 * It extends the ErrorMsg class and sets a specific error code for database no data errors.
 *
 * @class DatabaseNoDataError
 * @extends {ErrorMsg}
 */

import ErrorMsg from "./ErrorMsg.mjs"
import { errorCodes } from "./error-codes.mjs"

export default class DatabaseNoDataError extends ErrorMsg {

    constructor() {
        super(errorCodes.DATABASE_ERROR_NO_DATA)
        this.httpStatusCode = 404
    }

}