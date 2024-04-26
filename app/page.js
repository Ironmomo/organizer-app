import styles from "./page.module.css";
import homeContent from "../locales/de/home.json"
import Button from "@/components/Button/Button"
import Link from "next/link";

/**
 * Home Page
 *
 * @description Server-side rendered page with navigation buttons and upcoming tasks display.
 *              Allows users to delete upcoming tasks.
 * @returns {JSX.Element} - Rendered Home page component.
 */
export default async function Home() {

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
      </div>
    </main>
  )
}
