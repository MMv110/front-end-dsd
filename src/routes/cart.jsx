<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import Navbar from "./navbar";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState(() => {
        // Recuperar el carrito del localStorage al cargar el componente
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Guardar el carrito en el localStorage cuando se actualice
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
            // Si la cantidad es 1, eliminar el producto del carrito
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

    return (
        <>
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
                <Link to={'/home'}>
                    <button className="btn btn-outline-danger mx-auto" type="submit">Pagar</button>
                </Link>
            </div>
        </>
    );
};

export default Cart;
=======
import React, { useEffect, useState } from 'react';
import Navbar from "./navbar";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState(() => {
        // Recuperar el carrito del localStorage al cargar el componente
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Guardar el carrito en el localStorage cuando se actualice
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
            // Si la cantidad es 1, eliminar el producto del carrito
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

    return (
        <>
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
                <Link to={'/home'}>
                    <button className="btn btn-outline-danger mx-auto" type="submit">Pagar</button>
                </Link>
            </div>
        </>
    );
};

export default Cart;
>>>>>>> 21bf2b28a18cf0353dda5616c812a24c5ae43b31
