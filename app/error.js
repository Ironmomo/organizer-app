'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import Button from '@/components/Button/Button'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import errorContent from '@/locales/de/errorComponent.json'
 
/**
 * Error
 *
 * @component
 * @description A Error Page used to display error messages and provide an option to reset or navigate.
 * @param {Object} props - Component props.
 * @param {Error} props.error - The error object containing the error message.
 * @returns {JSX.Element} - Rendered Error component.
 */
export default function Error({ error }) {

  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className={styles.errorContainer}>
      <h2>{error.message}</h2>
      <Button onClick={() => router.push('/')} text={errorContent.button1}/>
    </div>
  )
}