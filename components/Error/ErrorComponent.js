/**
 * ErrorComponent Component
 *
 * Description:
 * This component is used to display errors, specifically for client-side errors.
 * It provides a message describing the error and a button to reset or perform a specific action.
 *
 * Props:
 * - message: Error message to be displayed.
 * - reset: Function to be called when the reset button is clicked.
 *
 * @param {string} message Error message to be displayed.
 * @param {Function} reset Function to be called when the reset button is clicked.
 * @returns JSX.Element
 */

import Button from '../Button/Button'
import styles from './ErrorComponent.module.css'
import errorContent from '@/locales/de/errorComponent.json'


export default function ErrorComponent({ message, reset }) {
    return (
        <div className={styles.container}>
            <h2>{message}</h2>
            <Button onClick={reset} text={errorContent.button1}/>
        </div>
    )
}