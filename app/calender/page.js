'use client'
import styles from "./page.module.css"
import calenderContent from "../../locales/de/calender.json"
import Calender from "@/components/Calender/Calender"
import DragAndDropProvider from "@/components/DragAndDropProvider"
import { Suspense, useState } from "react"
import Loading from "@/app/loading"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"


/**
 * Calender Page
 *
 * @description Client-side rendered page to display tasks in a calendar format.
 *              Renders a title, a selector component to change the month of the calendar,
 *              and a calendar component.
 * @returns {JSX.Element} - Rendered CalenderPage component.
 */
export default function CalenderPage() {
    
  // State to store the selected date for the calendar
  const [date, setDate] = useState(new Date())

  /**
   * Change the displayed month by adding or subtracting months from the current date.
   * @param {number} toAdd - Number of months to add (positive) or subtract (negative).
   */
  function changeDate(toAdd) {
    const newDate = new Date(date.toISOString())
    newDate.setMonth(newDate.getMonth() + toAdd)
    setDate(newDate)
  }

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>
          {calenderContent.title}
        </h1>
      </div>
        <Suspense fallback={<Loading />}>
        <div className={styles.center}>
          <div className={styles.monthSelector}>
            <FaArrowLeft className="popupItem" onClick={() => changeDate(-1)}/>
            <FaArrowRight className="popupItem" onClick={() => changeDate(1)}/>
          </div>
          <DragAndDropProvider>
            <Calender date={date}/>
          </DragAndDropProvider>
        </div>
        </Suspense>
    </main>
  )
}
  