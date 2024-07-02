import React, { useState, useEffect } from 'react';
import Navbar from "./navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Product() {
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('email');

    if (token || email) {
        window.location.href = 'http://dfv8z1sgwh8u8.cloudfront.net/'
    }

    const url = window.location.href;
    let parts = url.split('#');
    const id = parts[parts.length - 1];
    const [data, setData] = useState([]);
    const [quantity, setQuantity] = useState(0);

    const addShopingCart = async (event) => {
        event.preventDefault();
        toast.loading('Añadiendo al carrito.');

        const idProduct = event.target.idProduct.value;
        const price = event.target.price.value;
        const id_usuario = email;

        try {
            const response = await fetch(`https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/carrito/${id_usuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    idProduct: idProduct,
                    quantity: quantity,
                    price: price
                })
            });

            if (!response.ok) {
                throw new Error('Error al añadir producto al carrito.');
            }

            // Añadir el producto al carrito local
            const newCartItem = {
                idProduct: idProduct,
                title: data.find(item => item.ID === idProduct).Nombre,
                price: parseFloat(price),
                quantity: quantity
            };

            // Guardar el carrito en el localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(newCartItem);
            localStorage.setItem('cart', JSON.stringify(cart));

            toast.dismiss();
            toast.success('Producto añadido correctamente.');
            setQuantity(0); // Resetear la cantidad después de añadir al carrito

        } catch (error) {
            console.error('Error al añadir producto al carrito:', error);
            toast.dismiss();
            toast.error('Error al añadir producto al carrito. Por favor, intenta de nuevo.');
        }
    };

    useEffect(() => {
        const id_usuario = id;
        fetch(`https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/producto/${id_usuario}`)
            .then(response => response.json())
            .then(fetchedData => setData(fetchedData))
            .catch(error => console.log("No andamos josha, error en fetch de producto: " + error));
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            <Navbar />
            {data.map((item) => (
                <div className="col-6 mx-auto" key={item.ID}>
                    <div className="card">
                        <img src={`https://268r9iu4hg.execute-api.us-east-1.amazonaws.com/dev/makeupmania?file=${item.ID.split('#')[item.ID.split('#').length - 1]}.jpg`} className="card-img-top mx-6" height="250"/>
                        <div className="card-body">
                            <h5 className='text-center'>{item.Nombre}</h5>
                            <p className="card-text">{item.Descripcion}</p>
                            <div className='text-center row col-4 mx-auto'>
                                <form onSubmit={addShopingCart}>
                                    <input type="hidden" name="idProduct" value={item.ID} />
                                    <span>Cantidad</span>
                                    <input className='form-control col' name='cart' type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min={0} />
                                    <span>Precio</span>
                                    <input className='form-control col' name='price' type="number" value={item.Precio} readOnly />

                                    <button type='submit' className='btn btn-primary col-auto'>
                                        Añadir
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
