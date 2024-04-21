import { Suspense } from "react"
import Loading from '@/app/loading'
import styles from './page.module.css'
import taskContent from '@/locales/de/tasks.json'

/**
 * Task Layout
 *
 * @component
 * @description Layout component to display a page with a title and content.
 * @param {Object} props - Component props.
 * @param {Object} props.params - Parameters for the layout.
 * @param {ReactNode} props.children - Child components to be rendered within the layout.
 * @returns {JSX.Element} - Rendered TaskLayout component.
 */
export default function TaskLayout({ params, children }) {
    
    return (
    <main className={styles.main}>
        <header>
            <div className={styles.title}>
            <h1>
                {taskContent.title}
            </h1>
            </div>
        </header>
        <div className={styles.center}>
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
        </div>
    </main>
    )

}