import { React } from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4" data-bs-theme="dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand">Hidden brand</a>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link to={'/home'} className="nav-link" aria-current="page">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={'/cart'} className="nav-link">Carrito</Link>
                    </li>
                </ul>
                <Link to={'/'}><button className="btn btn-outline-danger" type="submit">Log out</button></Link>
                </div>
            </div>
        </nav>
    </>
  )
}