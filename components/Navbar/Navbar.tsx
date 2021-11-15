import Link from "next/link"
import { Nav } from "react-bootstrap"
import BNavbar from "react-bootstrap/Navbar"

import { useSession } from "contexts/Session"

import { ClickableLink } from "./styles"

const Navbar = () => {
  const { currentUser, signout } = useSession()

  return (
    <BNavbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Link href="/">
        <a className="navbar-brand">App Client Next</a>
      </Link>
      <BNavbar.Toggle aria-controls="responsive-navbar-nav" />
      <BNavbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {currentUser ? (
            <>
              <Nav.Link>{currentUser.email}!</Nav.Link>
              <ClickableLink className="nav-link" onClick={signout}>
                Sign Out
              </ClickableLink>
            </>
          ) : (
            <Link href="/signin">
              <a className="nav-link">Sign In</a>
            </Link>
          )}
        </Nav>
      </BNavbar.Collapse>
    </BNavbar>
  )
}

export default Navbar
