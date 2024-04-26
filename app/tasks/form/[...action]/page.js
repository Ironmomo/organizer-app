'use client'
import Button from '@/components/Button/Button'
import styles from './page.module.css'
import { formAction } from '@/utils/request/ServerAction'
import { useSearchParams } from 'next/navigation'
import formContent from '@/locales/de/form.json'
import { useEffect, useState } from 'react'
import ErrorComponent from '@/components/Error/ErrorComponent'

/**
 * @function fetchGetTask
 * @description Load task by ID from the API and loads it in the state.
 * @param {string} id - The ID of the task to fetch.
 * @returns {Promise<object>} - Promise that resolves with the task data.
 * @throws {string} - Error message if fetching data fails.
 */
async function fetchGetTask(id) {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/api/task/form?id=${id}}`)
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
 * TaskForm
 *
 * @component
 * @description This client-side component is used to render a Form view to create or update a Task.
 * @param {Object} params - Parameters for the task action.
 * @param {string[]} params.action - Action to be taken (create or update).
 * @returns {JSX.Element} - Rendered TaskForm component.
 */
export default function TaskForm({ params }) {

    const searchParams = useSearchParams()

    const currentDate = new Date()
    currentDate.setMinutes(Math.round(currentDate.getMinutes() / 5) * 5 )

    const [taskObject, setTaskObject] = useState({
        title: '',
        description: '',
        date: currentDate.toISOString().split(".")[0],
        id: ''
    })

    const [error, setError] = useState(null)

    /**
     * @function getTaskById
     * @description Load task by ID from the API and load it into the state.
     * In case of an error, set the error state to the ErrorComponent to render.
     */
    function getTaskById() {
        const id = searchParams.get('id')
        if(id) {
            fetchGetTask(id)
            .then(data => setTaskObject({...data, date: new Date(data.date).toISOString().split(".")[0] }))
            .catch(errMsg => setError(<ErrorComponent message={errMsg} reset={() => {setError(null); getTaskById()}}/>))
        }
    }

    useEffect(() => {
        getTaskById()
    },[])

    return (
        error ? error :

        <div className={styles.formContainer}>
            <div className={styles.formTitle}>
                <p>{formContent.title}</p>
            </div>

            <form action={formAction}>
                <div className={`${styles.formCenter}`}>
                <div className={`${styles.formTaskTitle} ${styles.formItem}`}>
                    <label className='flex-row'>
                        {formContent.titleLabel}
                        <textarea name={'title'} rows={1} defaultValue={taskObject.title}/>
                    </label>
                </div>

                <div className={`${styles.formTaskDescription} ${styles.formItem}`}>
                    <label className='flex-row'>
                        {formContent.descriptionLabel}
                        <textarea name={'description'} defaultValue={taskObject.description}/>
                    </label>
                </div>

                <div className={`${styles.formTaskDate} ${styles.formItem}`}>
                    <label className='flex-row'>
                        {formContent.dateLabel}
                        <input type='datetime-local' name={'date'} defaultValue={taskObject.date}/>
                    </label>
                </div>
                <input type='number' hidden name={'id'} defaultValue={taskObject.id}/>
                <input type='text' hidden name={'action'} defaultValue={params.action[0]} />
                </div>

                <div className={styles.formFooter}>
                    <Button type={'submit'} text={formContent.submitButton}/>
                </div>
            </form>
        </div>
    )
}