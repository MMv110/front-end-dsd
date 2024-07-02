import React, { useEffect, useState } from 'react';
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');

    console.log(token);
    if (token || email) {
        window.location.href = 'http://dfv8z1sgwh8u8.cloudfront.net/'
    }

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const incrementQuantity = (index) => {
        const newCart = [...cart];
        newCart[index].quantity += 1;
        setCart(newCart);
    };

    const decrementQuantity = (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCart(newCart);
        } else {
            removeItem(index);
        }
    };

    const removeItem = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handlePayment = () => {
        const totalAmount = calculateTotal().toFixed(2);
        navigate('/pago', { state: { monto: totalAmount } });
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            <Navbar />
            <div className="form-data container-fluid">
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <button className="btn btn-secondary mx-1" onClick={() => decrementQuantity(index)}>-</button>
                                    <button className="btn btn-secondary mx-1" onClick={() => incrementQuantity(index)}>+</button>
                                    <button className="btn btn-danger mx-1" onClick={() => removeItem(index)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-center">
                    <h3>Total a pagar: ${calculateTotal().toFixed(2)}</h3>
                </div>
                <button className="btn btn-outline-danger mx-auto" onClick={handlePayment}>Pagar</button>
            </div>
        </>
    );
};

export default Cart;
