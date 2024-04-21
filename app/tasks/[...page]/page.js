"use client"

/**
 * NotePage Component
 *
 * Description:
 * This client-side rendered page displays a list of tasks fetched from the API, along with a search bar to filter tasks and a button to create new tasks.
 * Tasks are fetched using paging, and they can be filtered using an optional search pattern.
 *
 * Usage:
 * A dynamic segment called action is used to define the page to be loaded from the Backend.
 *
 * Props:
 * - params: An object containing parameters for the page, such as the page number.
 *
 * Functions:
 * - loadTasks(): Loads all tasks of the given page from the API and updates the component state. Displays an error message if an error occurs.
 * - search(searchString): Performs a string search for tasks against the API and updates the component state accordingly. Displays an error message if an error occurs.
 *
 * @param {Object} params An object containing parameters for the page, such as the page number.
 * @returns JSX.Element
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Task from '@/components/Tasks/Task'
import ErrorComponent from '@/components/Error/ErrorComponent'
import styles from './page.module.css'
import Search from '@/components/Search/Search'
import { IoMdAddCircleOutline } from 'react-icons/io'

/**
 * Fetch data from the API using paging. 
 * @param {*} page 
 * @returns a promise which resolves a list of tasks or rejects an error message
 */
async function fetchGetTasks(page) {

  return new Promise(async (resolve, reject) => {
      try {
          const response = await fetch(`/api/task/page?page=${page}`)
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

/**
 * Fetch data from the API using a searchPattern.
 * @param {*} searchPattern 
 * @returns a promise which resolves a list of tasks or rejects an error message
 */
async function fetchSearchTasks(searchPattern) {

  return new Promise(async (resolve, reject) => {
      try {
          const response = await fetch(`/api/task/searchBy?search=${searchPattern}`)
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


export default function NotePage({ params }) {
  // Tasks to display
  const [tasks, setTasks] = useState([])
  // Holds ErrorComponent to display if there has been an Error
  const [error, setError] = useState(null)
  // Toggle state to force fetching of the tasks
  const [reload, setReload] = useState(true)


  useEffect(() => {
    loadTasks()
  },[reload])


  /**
   * Load all tasks of the given page from the API and loads it in the state.
   * In case of an error it sets the error state to the ErrorComponent to render
   */
  function loadTasks() {
      fetchGetTasks(params.page[0])
      .then(data => setTasks(data))
      .catch(errMsg => setError(<ErrorComponent message={errMsg} reset={() => {setError(null); loadTasks()}}/>))
  }


  /**
   * To perform a string search for tasks against the API and loads it in the state.
   * In case of an error it sets the error state to the ErrorComponent to render
   * @param {String} searchString 
   * @returns List of tasks which match the searchString
   */
  function search(searchString) {
    fetchSearchTasks(searchString)
    .then(data => setTasks(data))
    .catch(errMsg => setError(<ErrorComponent message={errMsg} reset={() => {setError(null); loadTasks()}}/>))
  }


  return (
    error ? error :
    <>
    <div className={`${styles.centerHeaderContainer} flex-row`}>
      <Search search={search}/>
      <Link href="/tasks/form/add" className={`${styles.addItem} popupItem`}>
        <p><IoMdAddCircleOutline/></p>
      </Link>
    </div>
    <div className={`${styles.centerTaskContainer} flex-row`}>
        {tasks.map(task => { task.date = new Date(task.date); return <Task key={task.id} task={task} refresh={() => setReload(!reload)}/> })}
    </div>
    </>
  )
}