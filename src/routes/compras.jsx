import { React, useState, useEffect } from 'react';
import Navbar from './navbar';

export default function(){
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');

    if (token || email) {
        window.location.href = 'http://dfv8z1sgwh8u8.cloudfront.net/'
    }

    const [data, setData] = useState([]);
    // Cargar los pagos del usuario
    useEffect(() => {
        const response = fetch(`https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/pago/${email}/all`)
            .then(response => response.json())
            .then(fetchedData => typeof fetchedData == "object" ? setData(fetchedData) : setData([]))
            .catch(error => console.log("No andamos josha, error en fetch de home."+error))

        }, []);
    console.log(data)
    return(
        <>
            <Navbar/>
            
            {/* Tabla de los productos */}
            { data.length ? (
            <div className='container mt-5'>
                <table className="py-4 my-4 table table-stripped">
                    <thead>
                        <tr className='text-center'>
                            <th scope='col'>#</th>
                            <th scope='col'>Monto a pagar</th>
                            <th scope='col'>Método de pagar</th>
                            <th scope='col'>Nombre del titular</th>
                            <th scope='col'>Fecha de vencimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <th scope='col' className='text-center'>{item.ID}</th>
                                <td>${item.Total}</td>
                                <td>{item.Metodo}</td>
                                <td>{item.Usuario}</td>
                                <td>{item.Fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            ) : ( <h1 className='text-center'>No hay pagos aún</h1>)}
        </>
    )
}