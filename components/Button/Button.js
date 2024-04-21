/**
 * Button Component
 *
 * Description:
 * This component provides a simple button with unified design and basic button logic.
 * It allows customization of the button's text, click handler, and type.
 *
 * Usage:
 * ```jsx
 * <Button onClick={handleClick} text="Click me" type="submit" />
 * ```
 * 
 * @param {Function} onClick Function to be called when the button is clicked.
 * @param {string} text Text to be displayed on the button.
 * @param {string} type (Optional) Type of the button. Defaults to 'button'. Can be 'button', 'submit', or 'reset'.
 * @returns JSX.Element
 */

import styles from './Button.module.css'


export default function Button({ onClick, text, type }) {
    return (
        <button type={type || 'button'} onClick={onClick} className={`${styles.container, styles.expandEffect}`}>
            <span>{text}</span>
        </button>
    )
}