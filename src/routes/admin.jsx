import { React, useState, useEffect } from 'react';
import NavbarAdmin from './navbar-admin';
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function(){
    const [data, setData ] = useState([])
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(fetchedData => setData(fetchedData))
            .catch(error => console.log("No andamos josha, error en fetch de home."))
    }, []);

    const [ value, setValue ] = useState(0)
    const [ rowData, setRowData ] = useState({})


    const handleRowClick = (id) => {
        console.log(data[id-1])
        setRowData(data[id-1]);
      };
      
    const deleting = () => {
        toast.success('Producto eliminado.')
    }

    const adding = () => {
        toast.success('Producto añadido,')
    }

    const editing = () => {
        toast.success('Producto editado.')
    }

    return(
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            <NavbarAdmin/>
            <div className="container mt-5">
                <div className='row'>

                    {/* Añadir producto */}
                    <div className="col-6 justify-content-center">
                        <div className="card px-5 py-5" id="form1">
                            <div className='card-title'>
                                <h2 className='mx-auto'>Añadir producto</h2>
                            </div>
                            <div className="form-data" >
                                <div className="mb-4">
                                    <span className="form-label">Nombre del producto</span>
                                    <input className="form-control" autocomplete="off" type="text" name='product' required/>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Descripción</span>
                                    <input className="form-control" autocomplete="off" type="text" name='description' required/>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Stock</span>
                                    <input className='form-control col' type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value))} min={0} required/>
                                </div>
                                <div className='mb-4'>
                                    <span className='form-label'>Imagen</span>
                                    <input className='form-control col' type="file" accept='.png' required/>
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className='btn btn-success' onClick={adding}>Añadir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Editar producto */}
                    <div className="col-6 justify-content-center">
                        <div className="card px-5 py-5" id="form1">
                            <div className='card-title'>
                                <h2 className='mx-auto'>Editar producto</h2>
                            </div>
                            <div className="form-data" >
                                <div className="mb-4">
                                    <span className="form-label">Nombre del producto</span>
                                    <input className="form-control" autocomplete="off" type="text" name='product' value={rowData.title} required/>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Descripción</span>
                                    <input className="form-control" autocomplete="off" type="text" name='description' value={rowData.body} required/>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Stock</span>
                                    <input className='form-control col' type="number" onChange={(e) => setValue(parseInt(e.target.value))} min={0} value={rowData.id || 0} required/>
                                </div>
                                <div className='mb-4'>
                                    <span className='form-label'>Imagen</span>
                                    <input className='form-control col' type="file" accept='.png' required/>
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className='btn btn-primary' onClick={editing}>Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mt-5'>
                <table className="py-4 my-4 table table-stripped">
                    <thead>
                        <tr className='text-center'>
                            <th scope='col'>#</th>
                            <th scope='col'>Title</th>
                            <th scope='col'>Description</th>
                            <th scope='col'>Stock</th>
                            <th scope='col'>Image</th>
                            <th scope='col'>Edit</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <th scope='col' className='text-center'>{item.id}</th>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                                <td>{item.id}</td>
                                <td><img src={`/img/${data.id}`} className="card-img-top"/></td>
                                <td><button className='btn btn-primary' onClick={() => handleRowClick(item.id)}><FaPencilAlt/></button></td>
                                <td><button className='btn btn-danger' onClick={deleting}><FaTrash/></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}