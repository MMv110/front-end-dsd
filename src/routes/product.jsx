import { React, useState, useEffect } from 'react';
import Navbar from "./navbar"
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function(){

    const url = window.location.href

    let parts  = url.split('#')
    const id = parts[parts.length - 1]
    const [ data, setData ] = useState([])
    const [ value, setValue ] = useState(0)

    const addShopingCart = async (event) => {
        event.preventDefault();
        toast.loading('Añadiendo al carrito.');
    
        const idProduct = event.target.idProduct.value; // Obtener el ID del producto desde el formulario
        const quantity = event.target.cart.value; // Obtener la cantidad del producto desde el formulario
    
        try {
            // Realizar la solicitud POST para agregar el producto al carrito
            const response = await fetch('https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idProduct: idProduct,
                    quantity: quantity
                })
            });
    
            if (!response.ok) {
                throw new Error('Error al añadir producto al carrito.');
            }
    
            // Si la solicitud es exitosa, mostrar mensajes de éxito y redireccionar
            toast.dismiss();
            toast.success('Producto añadido correctamente.');
           // toast.info('Redireccionando al menú.');
    
            setTimeout(() => {
                window.location.href = '/home';
            }, 3000);
    
        } catch (error) {
            console.error('Error al añadir producto al carrito:', error);
            toast.dismiss();
            toast.error('Error al añadir producto al carrito. Por favor, intenta de nuevo.');
        }
    };
    

    useEffect(() => {
        fetch(`https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/producto/${id}`)
            .then(response => response.json())
            .then(fetchedData => setData(fetchedData))
            .catch(error => console.log("No andamos josha, error en fetch de producto: "+error))
    }, []);

    console.log(data)

    return(
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            <Navbar/>
            {data.map((item) => (
                <div className="col-10 mx-auto">
                    <div className="card">
                        <img src={`/img/${item.ID}`} className="card-img-top"/>
                        <div className="card-body">
                            <h5 className='text-center'>{item.Nombre}</h5>
                            <p className="card-text">{item.Descripcion}</p>
                            <div className='text-center row col-4 mx-auto'>
                                <form onSubmit={addShopingCart}>
                                    <input type="hidden" name="idProduct" value={item.ID} />
                                    <input className='form-control col' name='cart' type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value))} min={0}/>
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
    )
}
