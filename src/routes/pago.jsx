/*import React from 'react';
import { Link } from "react-router-dom";

export default function Payment() {
  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card px-5 py-5" id="paymentForm">
              <div className="form-data">
                <div className="mb-4">
                  <span className="form-label">ID de Transacción</span>
                  <input className="form-control" autoComplete="off" type="text" placeholder="XXX123-" />
                </div>
                <div className="mb-4">
                  <span className="form-label">Monto</span>
                  <input className="form-control" autoComplete="off" type="number" step="0.01" placeholder="00.00" />
                </div>
                <div className="mb-4">
                  <span className="form-label">Método de Pago</span>
                  <select className="form-control">
                    <option value="CC">Tarjeta de Crédito</option>
                  </select>
                </div>
                <div className="mb-4">
                  <span className="form-label">Número de Tarjeta</span>
                  <input className="form-control" autoComplete="off" type="text" placeholder="1234 5678 9012 3456"  maxLength="16" />
                </div>
                <div className="mb-4">
                  <span className="form-label">Nombre del Titular</span>
                  <input className="form-control" autoComplete="off" type="text" placeholder="Nombre Completo" />
                </div>
                <div className="mb-4">
                  <span className="form-label">Fecha de Vencimiento</span>
                  <input className="form-control" autocomplete="off" type="date"/>
                </div>
                <div className="mb-4">
                  <span className="form-label">CVV</span>
                  <input className="form-control" autoComplete="off" type="text" placeholder="123"  maxLength="3"/>
                </div>
                <Link to={'/'}>
                  <div className="mb-3">
                    <button className="btn btn-dark w-100">Pagar</button>
                  </div>
                </Link>
                <Link to={'/'}>
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
}
*/
import React from 'react';
import Navbar from "./navbar";
import { useLocation, Link } from "react-router-dom";

const Payment = () => {
    const location = useLocation();
    const { monto } = location.state || { monto: '0.00' };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <div className="card px-5 py-5" id="paymentForm">
                            <div className="form-data">
                                <div className="mb-4">
                                    <span className="form-label">Monto a Pagar</span>
                                    <input className="form-control" autoComplete="off" type="text" value={`$${monto}`} readOnly />
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">ID de Transacción</span>
                                    <input className="form-control" autoComplete="off" type="text" placeholder="XXX123-" />
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Método de Pago</span>
                                    <select className="form-control">
                                        <option value="CC">Tarjeta de Crédito</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Número de Tarjeta</span>
                                    <input className="form-control" autoComplete="off" type="text" placeholder="1234 5678 9012 3456" maxLength="16" />
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Nombre del Titular</span>
                                    <input className="form-control" autoComplete="off" type="text" placeholder="Nombre Completo" />
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Fecha de Vencimiento</span>
                                    <input className="form-control" autoComplete="off" type="date"/>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">CVV</span>
                                    <input className="form-control" autoComplete="off" type="text" placeholder="123" maxLength="3"/>
                                </div>
                                <Link to={'/'}>
                                    <div className="mb-3">
                                        <button className="btn btn-dark w-100">Pagar</button>
                                    </div>
                                </Link>
                                <Link to={'/'}>
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
