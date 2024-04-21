import styles from './Calender.module.css'
import { useDrop } from 'react-dnd'
import Task from './Task'

/*
    DayBox is used to render all given tasks of a day. 
    It contains a dropReference to make it dropable and therefore to update the date of a Task to its day when droped over it.
*/
export default function DayBox({ day, tasks, updateTask, deleteTask }) {

    /*
        When Task is droped over DayBox. The task changes its date to the day of the DayBox.
    */
    const [{ isOver }, dropRef] = useDrop({
        accept: "task",
        drop: (item) => {
            item.date.setDate(day)
            updateTask(item)
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
        }),
    })

    return (
        <div className={styles.dayBoxContainer} ref={dropRef}>
            <div className={styles.dayBoxHeader}>
                <div className={styles.number}>
                    <span>{day}</span>
                </div>
            </div>
            <div className={styles.dayBoxCenter}>
                {tasks.map((task, idx) => <Task key={idx} task={task} updateTask={updateTask} deleteTask={deleteTask}/>)}
            </div>
        </div>
    )
}