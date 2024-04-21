/**
 * ErrorMsg Class
 *
 * Description:
 * This class represents a generic error message. It extends the built-in Error class to provide custom error handling functionality.
 *
 * @class ErrorMsg
 * @extends {Error}
 */

export default class ErrorMsg extends Error {

    constructor(message) {
        super(message)
        this.httpStatusCode = undefined
        this.stack = null
    }

}