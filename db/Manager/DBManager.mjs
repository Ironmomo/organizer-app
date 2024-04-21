/**
 * Abstract Class to use as a blueprint for DBManager classes. DBManager can be used as a ORM.
 */
export default class DBManager {

    constructor(connector) {
        this.connector = connector
    }

    /**
     * Finds all the tasks for a given month orderd by date
     * @param {*} month 0-11
     * @returns list of taks
     */
    async findTasksByMonth(month, year) {
        return
    }

    /**
     * Creates a new Task
     * @param {*} title of the new Task
     * @param {*} description of the new Task
     * @returns resolves the newly created Task
     * If reject it creates a DatabaseError.
     */
    async createTask(title, description, date) {
        return
    }

    /**
     * Find a Task by Id
     * @param {*} id of the task
     * @returns resolves the Task if it founds one. 
     * If reject it creates a DatabaseNoDataError if there is no entry with the given id or a DatabaseError if there is another issue.
     */
    async findTaskById(id) {
        return
    }

    /**
     * Delete Task by Id
     * @param {*} id 
     * @returns resolves the id if the task has been deleted successfully. 
     * If reject it creates a DatabaseNoDataError if there is no entry with the given id or a DatabaseError if there is another issue.
     */
    async deleteTaskById(id) {
        return
    }

     /**
     * Find tasks by implementing paging. The limit is 10 by default
     * @param {*} page 
     * @param {*} limit 
     * @returns List of Task Objects. Throws a DatabaseNoDataError if no data has been found or a DatabaseError if something went wrong.
     */
     async findAll(page, limit) {
        return
     }

     /**
     * Find tasks by searchString. It checks if task_title or task_description contains the searchString. The number of returned rows is limited.
     * @param {String} searchString which is included in task_title or task_description
     * @param {Integer} limit number of rows. Default is 10
     * @returns List of Task Objects. Throws a DatabaseNoDataError if no data has been found or a DatabaseError if something went wrong.
     */
    async findTaskByString(searchString, limit) {
        return
    }

    /**
     * Find upcoming tasks orderd by date. The limit of returned rows is 3 per default
     * @param {*} limit 
     * @returns List of Task Objects. Throws a DatabaseNoDataError if no data has been found or a DatabaseError if something went wrong.
     */
    async findUpcomingTasks(limit) {
        return
    }

    /**
     * Call this method when the connection should be closed
     */
    handleExit() {
        this.connector.handleExit()
    }

}