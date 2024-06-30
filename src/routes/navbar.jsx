import { React } from 'react'
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoHome } from "react-icons/io5";



export default function Navbar() {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4" data-bs-theme="dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link to={'/home'} className="nav-link" aria-current="page"><IoHome /> Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link to={'/cart'} className="nav-link"><FaShoppingCart /> Carrito </Link>
                    </li>
                </ul>
                <Link to={'/'}><button className="btn btn-outline-danger" type="submit">Log out</button></Link>
                </div>
            </div>
        </nav>
    </>
  )
}