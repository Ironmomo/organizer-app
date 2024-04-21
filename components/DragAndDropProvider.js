"use client"

/**
 * DragAndDropProvider Component
 *
 * Description:
 * This client-side component is a workaround for using the DndProvider from 'react-dnd' library, which needs to be a client-side component.
 * It wraps the children components with the DndProvider and provides the HTML5Backend for drag and drop functionality.
 *
 * Usage:
 * ```jsx
 * <DragAndDropProvider>
 *     {/* Your components that require drag and drop functionality *\/}
 * </DragAndDropProvider>
 * ```
 *
 * Props:
 * - children: The components to be wrapped by the DragAndDropProvider.
 *
 * @param {ReactNode} children The components to be wrapped by the DragAndDropProvider.
 * @returns JSX.Element
 */

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


export default function DragAndDropProvider({ children }) {

    return (
        <DndProvider backend={HTML5Backend}>
            {children}
        </DndProvider>
    )
}