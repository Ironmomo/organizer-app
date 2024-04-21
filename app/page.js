import styles from "./page.module.css";
import homeContent from "../locales/de/home.json"
import Button from "@/components/Button/Button"
import Link from "next/link";
import { upcomingTasks } from "@/utils/request/ServerAction";
import SQLDBManager from "@/db/Manager/SQLDBManager.mjs";
import { revalidatePath } from "next/cache";
import { MdDeleteOutline } from "react-icons/md"
import { isInteger } from "@/utils/request/dataEvaluation.mjs";
import RequestError from "@/utils/error/RequestError.mjs";

/**
 * Home Page
 *
 * @description Server-side rendered page with navigation buttons and upcoming tasks display.
 *              Allows users to delete upcoming tasks.
 * @returns {JSX.Element} - Rendered Home page component.
 */
export default async function Home() {

  const tasks = await upcomingTasks()

  /**
   * @function deleteTask
   * @description Server action to delete a task. Receives formData containing the task ID.
   *              Deletes the task with the given ID. Throws a RequestError if the ID is not valid.
   *              After deletion, revalidates the path to update the UI.
   * @param {FormData} formData - Form data containing an 'id' field with the task ID to delete.
   */
  async function deleteTask(formData) {
    "use server"
    const id = formData.get("id")
    if (!isInteger(id)) throw new RequestError()
    const dbm = new SQLDBManager()
    await dbm.deleteTaskById(parseInt(id))
    revalidatePath("/")
  }


  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>
          {homeContent.title}
        </h1>
      </div>
      <div className={styles.description}>
        <p>
          {homeContent.description}
        </p>
        <div className={`${styles.buttoncontainer} flex-row`}>
          <Link href="/calender" className={`popupItem`}>
            <Button text={homeContent.calenderBtn}/>
          </Link>
          <Link href="/tasks/1" className={`popupItem`}>
            <Button text={homeContent.taskBtn}/>
          </Link>
        </div>
      </div>

      <div className={styles.center}>
          <h1 className={styles.centerTitle}>{homeContent.centerTitle}</h1>
          {tasks.map(task => {
            return (
              <div key={task.id} className={`${styles.taskContainer} flex-row`}>
                <div className={styles.taskTitle}>{task.title}</div>
                <div>
                  <form action={deleteTask}>
                    <input type="text" name="id" hidden defaultValue={task.id}/>
                    <button type='submit' className={styles.buttonWrap}>
                        <MdDeleteOutline className={`${styles.deleteIcon} popupItem`}/>
                    </button>
                  </form>
                </div>
              </div>  
            )
          })}
      </div>
    </main>
  )
}
