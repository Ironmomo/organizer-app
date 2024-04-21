import Task from '../../model/Task.mjs'
import getInstance from "../SQLConnector.mjs"
import DatabaseNoDataError from '../../utils/error/DatabaseNoDataError.mjs'
import DatabaseError from '../../utils/error/DatabaseError.mjs'
import DBManager from './DBManager.mjs'


/**
 * SQLDBManager implements the DBManager class and connects to MySql as an ORM.
 */
export default class SQLDBManager extends DBManager {

    constructor() {
        super(getInstance())
    }

    /**
     * Finds all the tasks for a given month orderd by date
     * @param {int} month 0-11 (js Date format)
     * @returns list of taks
     */
    async findTasksByMonth(month, year) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.connector.executeQuery('SELECT * from task_table WHERE MONTH(task_date) = ? AND YEAR(task_date) = ? ORDER BY task_date', month + 1, year)
                resolve(data.map(row => new Task(row.task_id, row.task_title, row.task_description, row.task_date)))
            } catch (error) {
                reject(new DatabaseError())
            }
        })
    }

    /**
     * Creates a new Task
     * @param {*} title of the new Task
     * @param {*} description of the new Task
     * @returns resolves the newly created Task
     * If reject it creates a DatabaseError.
     */
    async createTask(title, description, date) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.connector.executeQuery('INSERT INTO task_table(task_title, task_description, task_date) VALUES (?, ?, ?)', title, description, date)
                const task = new Task(data.insertId, title, description, date)
                resolve(task)
            } catch (error) {
                reject(new DatabaseError())
            }
        })   
    }

    /**
     * Find a Task by Id
     * @param {*} id of the task
     * @returns resolves the Task if it founds one. 
     * If reject it creates a DatabaseNoDataError if there is no entry with the given id or a DatabaseError if there is another issue.
     */
    async findTaskById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.connector.executeQuery('SELECT * from task_table WHERE task_id = ?', id)
                if(data.length === 1) {
                    resolve(new Task(data[0].task_id, data[0].task_title, data[0].task_description, data[0].task_date))
                } else {
                    reject(new DatabaseNoDataError())
                }
            } catch (error) {
                reject(new DatabaseError())
            }
        })
    }

    /**
     * Delete Task by Id
     * @param {*} id 
     * @returns resolves the id if the task has been deleted successfully. 
     * If reject it creates a DatabaseNoDataError if there is no entry with the given id or a DatabaseError if there is another issue.
     */
    async deleteTaskById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.connector.executeQuery('DELETE from task_table WHERE task_id = ?', id)
                if(data.affectedRows === 1) {
                    resolve(id)
                } else {
                    reject(new DatabaseNoDataError())
                }
            } catch (error) {
                reject(new DatabaseError())
            }
        })
    }
    
    /**
     * Update an existing Task
     * @param {*} task the task to update
     * @returns resolves the id of the updated task
     * If reject it creates a DatabaseError.
     */
    async updateTask(task) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.connector.executeQuery('UPDATE task_table SET task_title = ?, task_description = ?, task_date = ? WHERE task_id = ?', task.title, task.description, new Date(task.date), task.id)
                if(data.affectedRows === 1) {
                    resolve(task.id)
                } else {
                    reject(new DatabaseNoDataError())
                }
            } catch (error) {
                reject(new DatabaseError())
            }
        })
    }

    /**
     * Find tasks by searchString. It checks if task_title or task_description contains the searchString. The number of returned rows is limited.
     * @param {String} searchString which is included in task_title or task_description
     * @param {Integer} limit number of rows. Default is 10
     * @returns List of Task Objects. Throws a DatabaseNoDataError if no data has been found or a DatabaseError if something went wrong.
     */
    async findTaskByString(searchString, limit = 10) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.connector.executeQuery('SELECT * FROM task_table WHERE task_title LIKE ? OR task_description LIKE ? LIMIT ?', `%${searchString}%`, `%${searchString}%`, limit)
                if(data.length >= 1) {
                    resolve(data.map(task => new Task(task.task_id, task.task_title, task.task_description, task.task_date)))
                } else {
                    reject(new DatabaseNoDataError())
                }
            } catch (error) {
                reject(new DatabaseError())
            }
        })
    }

    /**
     * Find tasks by implementing paging. The limit is 10 by default
     * @param {*} page 
     * @param {*} limit 
     * @returns List of Task Objects. Throws a DatabaseNoDataError if no data has been found or a DatabaseError if something went wrong.
     */
    async findAll(page, limit = 10) {
        const offset = (page - 1) * limit
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.connector.executeQuery('SELECT * FROM task_table ORDER BY task_date LIMIT ? OFFSET ?', limit, offset)
                resolve(data.map(task => new Task(task.task_id, task.task_title, task.task_description, task.task_date)))
            } catch (error) {
                reject(new DatabaseError())
            }
        })
    }

    /**
     * Find upcoming tasks orderd by date. The limit of returned rows is 3 per default
     * @param {*} limit 
     * @returns List of Task Objects. Throws a DatabaseNoDataError if no data has been found or a DatabaseError if something went wrong.
     */
    async findUpcomingTasks(limit = 3) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.connector.executeQuery('SELECT * FROM task_table WHERE task_date >= NOW() ORDER BY task_date LIMIT ?', limit)
                resolve(data.map(task => new Task(task.task_id, task.task_title, task.task_description, task.task_date)))
            } catch (error) {
                reject(new DatabaseError())
            }
        })
    }

    /**
     * Call this method when the connection should be closed
     */
    handleExit() {
        this.connector.handleExit()
    }

}