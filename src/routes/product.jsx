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
