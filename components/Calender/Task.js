import { useState } from 'react'
import styles from './Calender.module.css'
import { useDrag } from "react-dnd"
import { MdDeleteOutline } from "react-icons/md"
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import Button from '../Button/Button'

/*
  Task Component is used to display the information about a task.
  Can fold up (open) the component by clicking on it. If open the component shows all informations about the task. 
  It is also possible to delete or edit a task. To edit a task it is possible to change the time in the opened view. To edit other fields of a task you can click the edit icon.
  The Task Component contains a drag Reference to make it dragable.
*/
export default function Task({ task, updateTask, deleteTask }) {

  // Toggle between simple or detailed view of a task
  const [open, setOpen] = useState(false)
  // State to adjust the time of a task
  const [taskHour, setTaskHour] = useState(task.date.getHours())
  const [taskMin, setTaskMin] = useState(task.date.getMinutes())


  const [{ isDragging }, dragRef] = useDrag({
      type: "task",
      item: task,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })

  /**
   * Client side function to call the updateTask function and to change the time state of the component.
   */
  function setTime() {
    // Treat date propertie as immutable 
    const updatedTime = new Date(task.date.toISOString())
    updatedTime.setHours(taskHour)
    updatedTime.setMinutes(taskMin)
    // create new object to prevent side effects
    const updatedTask = {...task, date: updatedTime}
    updateTask(updatedTask)
  }

  return (

    open ? 
    
    <div className={styles.openTaskContainer}>
      <div className={styles.openTaskHeader}>
        <span className={styles.title}>{task.title}</span>
        <IoClose className={`${styles.closeIcon} popupItem`} onClick={() => setOpen(false)}/>
      </div>

      <div className={styles.openTaskCenter}>

        <div className={styles.descriptionContainer}>
          <p>{task.description}</p>
        </div>
        
        <div className={styles.timeContainer}>
          <div className={`${styles.hour} flex-row`}>
            <input type={'number'} min={0} max={23} value={taskHour} onChange={ev => setTaskHour(ev.target.value)}/>
            <div className={styles.arrowBox}>
              <IoIosArrowUp className={`${styles.arrow} popupItem`} onClick={() => setTaskHour(taskHour + 1)}/>
              <IoIosArrowDown className={`${styles.arrow} popupItem`} onClick={() => setTaskHour(taskHour - 1)}/>
            </div>
          </div>
          <span>:</span>
          <div className={`${styles.minutes} flex-row`}>
            <input type={'number'} min={0} max={59} value={taskMin} onChange={ev => setTaskMin(ev.target.value)}/>
            <div className={styles.arrowBox}>
              <IoIosArrowUp className={`${styles.arrow} popupItem`} onClick={() => setTaskMin(taskMin + 5)}/>
              <IoIosArrowDown className={`${styles.arrow} popupItem`} onClick={() => setTaskMin(taskMin - 5)}/>
            </div>
          </div>
        </div>

      </div>

      <div className={styles.openTaskFooter}>
        <div className={`${styles.buttonContainer} flex-row`}>
            <Button onClick={() => {setTime(); setOpen(false)}} text={'Save'}/>
            <MdDeleteOutline className={`${styles.deleteIcon} popupItem`} onClick={() => {setOpen(false); deleteTask(task.id)}}/>
        </div>
      </div>
    </div>
    
    :
    <div className={`${styles.taskContainer} flex-row`} onClick={() => setOpen(!open)} ref={dragRef} draggable>
      <span className={styles.taskTitle}>{task.title}</span>
      <span className={styles.taskDate}>{task.date.toLocaleString('de', {hour: '2-digit', minute: '2-digit'})}</span>
    </div>
  )
}