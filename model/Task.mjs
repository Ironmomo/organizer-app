/**
 * Task Class
 *
 * Description:
 * This class represents a task object with properties such as id, title, description, and date.
 *
 * Usage:
 * 
 * const task = new Task(1, 'Task Title', 'Task Description', new Date());
 *
 * @class Task
 */
export default class Task {

    constructor(id, title, description, date) {
        this.id = id
        this.title = title
        this. description = description
        this.date = date
    }

}