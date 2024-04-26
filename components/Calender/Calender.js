"use client"

/**
 * Calender Component
 *
 * Description:
 * This client-side component presents tasks for a given month. It implements Drag and Drop mechanisms to update the day of a task,
 * and tasks inside the component can be deleted as well.
 *
 * Props:
 * - date: Date object representing the month to display tasks for.
 *
 * Functions:
 * - fetchGetTasks(month, year): Loads all tasks of the given month and year from the API and loads them into the component state. Displays an error message if an error occurs.
 * - fetchUpdateTask(updatedTask): Updates the tasks state and calls the API update function. Identifies the task to update by the task id. Displays an error message if an error occurs.
 * - fetchDeleteTask(taskId): Deletes a task by its id from the state and calls the API delete function. Displays an error message if an error occurs.
 * - loadTasks(): Loads all tasks of the given month and year from the API and loads them into the component state. Displays an error message if an error occurs.
 *
 * @param {Date} date Date object representing the month to display tasks for.
 * @returns JSX.Element
 */
import { useEffect, useState } from 'react'
import styles from './Calender.module.css'
import DayBox from './DayBox'
import { getDaysInMonth } from '@/utils/date.mjs'
import ErrorComponent from '../Error/ErrorComponent'
import Task from '@/model/Task.mjs'
import sortArray from '@/utils/sorter.mjs'


async function fetchGetTasks(month, year) {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/api/task/?month=${month}&year=${year}`)
            if (!response.ok) {
                const errorData = await response.json()
                reject(errorData.message)
            }
            const jsonData = await response.json()
            resolve(jsonData.data)
        } 
        catch (error) {
            reject('Error fetching data')
        }
    })
}


async function fetchUpdateTask(task) {
    
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/api/task/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            })
            if (!response.ok) {
                const errorData = await response.json()
                reject(errorData.message)
            } else {
                resolve()
            }
        } catch (error) {
            reject('Error fetching data')
        }
    })
}


async function fetchDeleteTask(taskId) {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/api/task/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskId)
            })
            if (!response.ok) {
                const errorData = await response.json()
                reject(errorData.message)
            } else {
                resolve()
            }
        } catch (error) {
            reject('Error fetching data')
        }
    })
}


export default function Calender({ date }) {

    const month = date.getMonth()
    const year = date.getFullYear()

    const divCount = Array.from({ length: getDaysInMonth(month, year) }, (_, index) => index + 1);

    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        loadTasks()
    },[date])

    /**
     * Load all tasks of the given month and year from the API and loads it in the state.
     * In case of an error it sets the error state to the ErrorComponent to render
     */
    function loadTasks() {
        fetchGetTasks(month, year)
        .then(data => setTasks(data))
        .catch(errMsg => setError(<ErrorComponent message={errMsg} reset={() => {setError(null); loadTasks()}}/>))
    }

    /**
     * Update the tasks State and calls the API update function. Identifies the task to update by the task id
     * In case of an error it sets the error state to the ErrorComponent to render
     * @param {Task} updatedTask
     */
    function updateTask(updatedTask) {
        const newTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
        const sortedTasks = sortArray(newTasks, (a,b) => a.date - b.date)
        setTasks(sortedTasks)
        fetchUpdateTask(updatedTask)
        .catch(errMsg => setError(<ErrorComponent message={errMsg} reset={() => {setError(null); updateTask(updatedTask)}}/>))
    }

    /**
     * Delete a task by its id from the state and calls the API delete function.
     * In case of an error it sets the error state to the ErrorComponent to render
     * @param {Integer} taskId 
     */
    function deleteTask(taskId) {
        setTasks(tasks.filter(task => task.id !== taskId))
        fetchDeleteTask(taskId)
        .catch(errMsg => setError(<ErrorComponent message={errMsg} reset={() => {setError(null); deleteTask(taskId)}}/>))
    }

    return(

        error ? error :
        <div className={styles.container}>
            <div className={`${styles.header} flex-row`}>
                <span>{new Date(year, month).toLocaleString('en-US', { month: 'long' })} {year}</span>
            </div>
            <div className={`${styles.dayContainer}` }>
                {divCount.map((number) => {
                    const dayTasks = []
                    for (const task of tasks) {
                        task.date = new Date(task.date)
                        if (task.date.getDate() === number) {
                            dayTasks.push({...task})
                        }
                    }
                    return <DayBox key={number} day={number} tasks={dayTasks} updateTask={updateTask} deleteTask={deleteTask}/>   
                })}
            </div>
        </div>
    )
}