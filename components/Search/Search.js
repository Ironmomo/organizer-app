"use client"

/**
 * Search Component
 *
 * Description:
 * This client-side component is used to create search queries for tasks.
 * It provides an input field where users can enter search queries, along with icons for searching and resetting the search filter.
 * When a search query is entered, the component triggers the search function passed as a prop with the entered query.
 * Users can also reset the search filter to show all tasks again.
 *
 * Usage:
 * ```jsx
 * <Search search={handleSearch} />
 * ```
 *
 * Props:
 * - search: Function to be called when a search query is entered. It receives the entered search query as a parameter.
 *
 * @param {Function} search Function to be called when a search query is entered. It receives the entered search query as a parameter.
 * @returns JSX.Element
 */

import { useState } from 'react'
import styles from './Search.module.css'
import { IoSearch } from "react-icons/io5"
import { RxReset } from "react-icons/rx"
import searchContent from '@/locales/de/search.json'


export default function Search({ search }) {

    const [searchString, setSearchString] = useState('')
    const [reset, setReset] = useState(false)

    function showAll() {
        setSearchString("")
        setReset(false)
        search("")
    }

    return (
        <div className={styles.searchContainer}>
            <input type='text' placeholder={searchContent.searchPlaceholder} value={searchString} onChange={(ev) => {setSearchString(ev.target.value); setReset(false)}}/>
            {reset ? <RxReset className={`${styles.searchIcon} popupItem`} onClick={showAll}/> : <IoSearch className={`${styles.searchIcon} popupItem`} onClick={() => {search(searchString); setReset(true)}}/>}
        </div>
    )
} 