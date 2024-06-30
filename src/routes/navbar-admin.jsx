<<<<<<< HEAD
import { React } from 'react'
import { Link } from "react-router-dom";

export default function NavbarAdmin() {
    
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to={'/'}><button className="btn btn-outline-danger" type="submit">Log out</button></Link>
            </div>
        </nav>
    </>
  )
=======
import { React } from 'react'
import { Link } from "react-router-dom";

export default function NavbarAdmin() {
    
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to={'/'}><button className="btn btn-outline-danger" type="submit">Log out</button></Link>
            </div>
        </nav>
    </>
  )
>>>>>>> 21bf2b28a18cf0353dda5616c812a24c5ae43b31
}