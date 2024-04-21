import "./globals.css"
import NavBar from "../components/Navigation/NavBar"

export const metadata = {
  title: "Organizer",
  description: "Organize your Tasks!",
}

/**
 * Root Layout
 *
 * @component
 * @description Layout component to display the pages with a navigation bar.
 * @param {ReactNode} children - Child components to be rendered within the layout.
 * @returns {JSX.Element} - Rendered RootLayout component.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`root`}>
        <div className={'header'}>
          <NavBar/>
        </div>
        <div className={"main"}>
          {children}
        </div>
      </body>
    </html>
  )
}
