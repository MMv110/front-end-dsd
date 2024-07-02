import { React, useState, useEffect, useHistory } from 'react';
import Navbar from "./navbar";
import { Link } from "react-router-dom";



const Payment = () => {
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');

    if (token || email) {
        window.location.href = 'http://dfv8z1sgwh8u8.cloudfront.net/'
    }

    const [ data, setData ] = useState([])
    const [ finalData, selectedData ] = useState(
        {
            paymentMethod: "CC",
            cardNumber: "",
            holderName: "",
            expirationDate: "",
            cvv: ""
        }
    )

    useEffect(() => {
        const email = "paredescarlos313@gmail.com"
        fetch(`https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/pago/${email}`)
            .then(response => response.json())
            .then(fetchedData => setData(fetchedData))
            .catch(error => console.log("No andamos josha, error en fetch de pago."+error))
        
    }, []);

    const handleSubmit = async(event) => {
        event.preventDefault();
        const pago = {...data, ...finalData}
        
        const response = await fetch(`https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/pago/${email}`, 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(pago)
            }
        )
        
        window.location.href = '/home'

    }

    const handleChange = (event) => {
        const { name, value } = event.target
        selectedData((prevState) => ({ ...prevState, [name]: value}))
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <div className="card px-5 py-5" id="paymentForm">
                            <div className="form-data">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <span className="form-label">Monto a Pagar</span>
                                        <input className="form-control-plaintext" name='Monto' autoComplete="off" type="text" value={data.Monto} readOnly onLoadedData={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">ID de Transacción</span>
                                        <input className="form-control-plaintext" name='ID' value={data.IDTransaccion} autoComplete="off" type="text" placeholder="XXX123-" onLoad={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Método de Pago</span>
                                        <select className="form-control" readOnly >
                                            <option selected value="CC">Tarjeta de Crédito</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Número de Tarjeta</span>
                                        <input className="form-control" autoComplete="off" type="text" placeholder="1234 5678 9012 3456" maxLength="16" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Nombre del Titular</span>
                                        <input className="form-control" name='holderName' value={data.Nombre} autoComplete="off" type="text" placeholder="Nombre Completo" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Fecha de Vencimiento</span>
                                        <input className="form-control" name='Fecha' autoComplete="off" type="date" onChange={handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">CVV</span>
                                        <input className="form-control" name='CVV' autoComplete="off" type="text" placeholder="123" maxLength="3" onChange={(e) => setValueEdit(parseInt(e.target.value))} onBlur={handleChange} min='111' max='999'/>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-dark w-100" type='submit'>Pagar</button>
                                    </div>
                                </form>
                                <Link to='/cart'>
                                    <div className="mb-3">
                                        <p className="text-center">Cancelar</p>
                                    </div>
                                </Link>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;