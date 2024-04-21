import styles from './page.module.css'
import { LiaSpinnerSolid } from "react-icons/lia"

/**
 * Loading Page
 *
 * @component
 * @description Page component to display a loading spinner while content is being loaded.
 * @returns {JSX.Element} - Rendered Loading page component.
 */
export default function Loading() {
    return <LiaSpinnerSolid className={`${styles.loadingIcon} spin`}/>
}