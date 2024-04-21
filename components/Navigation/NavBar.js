/**
 * NavBar Component
 *
 * Description:
 * This component presents the navigation bar, providing links to different pages of the application.
 * It includes icons for home, calendar, and tasks.
 *
 * Usage:
 * ```jsx
 * <NavBar />
 * ```
 *
 * Props: None
 *
 * @returns JSX.Element
 */

import Link from 'next/link'
import styles from './NavBar.module.css'
import { IoHomeOutline } from "react-icons/io5"
import { SlCalender } from "react-icons/sl"
import { FaRegNoteSticky } from "react-icons/fa6"


export default function NavBar() {
    return (
        <nav className={`${styles.nav} flex-row`}>
            <Link href="/" className={`${styles.navItem} popupItem`}>
                <p><IoHomeOutline /></p>
            </Link>
            <div className={`flex-row`}>
                <Link href="/calender" className={`${styles.navItem} popupItem`}>
                    <p><SlCalender/></p>
                </Link>
                <Link href="/tasks/1" className={`${styles.navItem} popupItem`}>
                    <p><FaRegNoteSticky/></p>
                </Link>
            </div>
        </nav>
    )
}