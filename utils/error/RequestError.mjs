/**
 * RequestError Class
 *
 * Description:
 * This class represents an error related to HTTP requests. It extends the ErrorMsg class and sets a specific error code for request errors.
 *
 * @class RequestError
 * @extends {ErrorMsg}
 */

import ErrorMsg from "./ErrorMsg.mjs"
import { errorCodes } from "./error-codes.mjs"

export default class RequestError extends ErrorMsg {

    constructor() {
        super(errorCodes.REQUEST_ERROR)
        this.httpStatusCode = 400
    }

}