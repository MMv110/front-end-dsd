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
                    <a className="nav-link active" aria-current="page"><Link to={'/home'}>Home</Link></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link"><Link to={'/cart'}>Carrito</Link></a>
                    </li>
                </ul>
                <Link to={'/'}><button className="btn btn-outline-danger" type="submit">Log out</button></Link>
                </div>
            </div>
        </nav>
    </>
  )
}