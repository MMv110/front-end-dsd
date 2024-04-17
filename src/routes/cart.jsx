import Navbar from "./navbar"
import { Link } from "react-router-dom"

export default function Cart() {
    return (
        <>
        <Navbar />
        <div className="form-data container-fluid" >
        <table class="table table-striped table-dark">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Producto 1</td>
                <td>$$$</td>
                <td>1</td>
                </tr>

                <tr>
                <th scope="row">2</th>
                <td>Producto 2</td>
                <td>$$$</td>
                <td>2</td>
                </tr>
            </tbody>
        </table>
        
        <Link to={'/home'}><button className="btn btn-outline-danger mx-auto" type="submit">Pagar</button></Link>
        
        </div>
        </>
    )
}