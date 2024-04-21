/**
 * Task Component
 *
 * Description:
 * This server-side component is used to present a task. It displays task details such as title, date, and description,
 * along with options to edit or delete the task.
 *
 * Usage:
 * ```jsx
 * <Task task={taskData} refresh={refreshTasks} />
 * ```
 *
 * Props:
 * - task: An object representing the task to be displayed. It should contain properties like id, title, date, and description.
 * - refresh: A function to refresh the task list after an action like deletion or update.
 *
 * @param {Object} task An object representing the task to be displayed. It should contain properties like id, title, date, and description.
 * @param {Function} refresh A function to refresh the task list after an action like deletion or update.
 * @returns JSX.Element
 */

import Link from 'next/link'
import styles from './Tasks.module.css'
import { MdDeleteOutline, MdEdit } from "react-icons/md"
import { deleteTask } from '@/utils/request/ServerAction'


export default function Task({ task, refresh }) {

    // Used to build the url for the task update form
    function formURLBuilder() {
        return `/tasks/form/update?id=${task.id}`
    }

    return (
        <div className={`${styles.taskContainer} popupItem`}>
            <div className={`${styles.taskHeader}`}>
                <span className={styles.taskTitle}>
                    {task.title}
                </span>
                <span className={styles.taskDate}>
                    {task.date.toLocaleString('de', {hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit'})}
                </span>
            </div>

            <div className={styles.taskCenter}>
                <div className={styles.taskDescription}>
                    <p>{task.description}</p>
                </div>
            </div>

            <div className={styles.taskFooter}>
                <Link href={formURLBuilder()}>
                    <MdEdit className={`${styles.editIcon} popupItem`}/>
                </Link>
                <form action={async (formData) => {
                    await deleteTask(formData)
                    refresh()
                    }}>
                    <input type='text' name='id' defaultValue={task.id} hidden/>
                    <button type='submit' className={styles.button}>
                        <MdDeleteOutline className={`${styles.deleteIcon} popupItem`}/>
                    </button>
                </form>
            </div>
        </div>
    )
}