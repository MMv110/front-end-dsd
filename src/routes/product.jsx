<<<<<<< HEAD
import { React, useState, useEffect } from 'react';
import Navbar from "./navbar"
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function(){

    const { id } = useParams()
    const [ data, setData ] = useState([])
    const [ value, setValue ] = useState(0)

    const addShopingCart = async(event) => {
        event.preventDefault()
        toast.loading('Añadiendo al carrito.')
        const {idProduct, cart} = event.target

        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
        })
        
        if (!response.ok){
            toast.dismiss()
            toast.error("Error al añadir producto!")
        }else{
            toast.dismiss()
            toast.success('Producto añadido correctamente.')
            toast.info('Redireccionando al menú.')
            setTimeout(() => {
                window.location.href = '/home'
            }, 3000)
            
        }     
    }
    useEffect(() => {
        fetch(`https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/producto/${id}`)
            .then(response => response.json())
            .then(fetchedData => setData(fetchedData[id]))
            .catch(error => console.log("No andamos josha, error en fetch de producto: "+error))
    }, []);
    return(
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            <Navbar/>
            <div className="col-10 mx-auto">
                <div className="card">
                    <img src={`/img/${data.id}`} className="card-img-top"/>
                    <div className="card-body">
                        <h5 className='text-center'>{data.title}</h5>
                        <p className="card-text">{data.body}</p>
                        <div className='text-center row col-4 mx-auto'>
                            <form onSubmit={addShopingCart}>
                                <input type="hidden" name="idProduct" value={data.id} />
                                <input className='form-control col' name='cart' type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value))} min={0}/>
                                <button type='submit' className='btn btn-primary col-auto'>
                                    Añadir
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
=======
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from "./navbar";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [cart, setCart] = useState(() => {
        // Recuperar el carrito del localStorage al cargar el componente
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Simulación de fetch de un producto desde una API
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.log("Error fetching product:", error));
    }, [id]);

    useEffect(() => {
        // Guardar el carrito en el localStorage cuando se actualice
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = () => {
        if (product) {
            const newItem = { ...product, quantity }; // Crear un nuevo item para el carrito
            setCart([...cart, newItem]); // Agregar el nuevo item al estado del carrito
            // Opcional: Puedes mostrar una notificación o mensaje de éxito al usuario
            alert(`${quantity} ${product.title}(s) añadido(s) al carrito.`);
            setQuantity(0); // Reiniciar la cantidad después de añadir al carrito
        }
    };

    return (
        <>
            <Navbar />
            <div className="col-10 mx-auto">
                {product && (
                    <div className="card">
                        <img src={`/img/${product.id}`} className="card-img-top" alt={product.title} />
                        <div className="card-body">
                            <h5 className='text-center'>{product.title}</h5>
                            <p className="card-text">{product.body}</p>
                            <div className='text-center row col-4 mx-auto'>
                                <input className='form-control col' type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min={0} />
                                <button className='btn btn-primary col-auto' onClick={addToCart}>
                                    Añadir al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Enlace a la página del carrito */}
            <div className="text-center">
                <Link to="/cart">
                    <button className='btn btn-secondary mt-4'>
                        Ver Carrito
                    </button>
                </Link>
            </div>
        </>
    );
};

export default ProductDetail;
>>>>>>> 21bf2b28a18cf0353dda5616c812a24c5ae43b31
