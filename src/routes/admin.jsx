import { React, useState, useEffect, useRef } from 'react';
import NavbarAdmin from './navbar-admin';
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function(){
    // Referencias de los formularios.
    const addRef = useRef(null)
    const editRef = useRef(null)
    
    // useStates de los valores enteros, la tabla y los datos de la tabla.
    const [ value, setValue ] = useState(0)
    const [ valueEdit, setValueEdit ] = useState(0)
    const [ rowData, setRowData ] = useState({})
    const [data, setData ] = useState([])

    // Definición de los useState de los formularios.
    const [formDataAddProduct, setFormDataAddProduct] = useState({
        ID: '',
        product: '',
        categoria: '',
        description: '',
        stock: '',
        precio: '',
        image: ''
    })
    const [formDataEditProduct, setFormDataEditProduct] = useState({
        product: '',
        description: '',
        stock: '',
        precio: '',
        image: ''
    })

    // Actualización de los datos del formulario Add
    const handleChangeAddProduct = (event) => {
        const { name, value } = event.target
        setFormDataAddProduct((prevState) => ({ ...prevState, [name]: value}))
    }

    // Evento de Agregar producto.
    const addProduct = async (event) => {
        event.preventDefault();
        toast.loading('Añadiendo producto...')
        const addData = formDataAddProduct
        
        let response = await fetch(
            `https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/producto?
                Nombre=${addData.name}
                &Categoria=${addData.categoria}
                &Descripcion=${addData.description}
                &Precio=${addData.precio}
                &Stock=${addData.stock}`, {
            method: 'POST',
        })
        
        if (!response.ok){
            toast.dismiss()
            toast.error("Error al añadir producto!")
        }else{
            toast.dismiss()
            toast.success('Producto añadido correctamente.')
            setFormDataAddProduct({product: '', description: '', stock: '', precio: '', image: ''})
            addRef.current.reset()
        }

    } 
    
    // Actualización de los datos del formulario editar.
    const handleChangeEditProduct = (event) => {
        const { name, value } = event.target
        setFormDataEditProduct((prevState) => ({ ...prevState, [name]: value}))
    }

    // Evento de Editar producto.
    const editProduct = async (event) => {
        event.preventDefault();
        toast.loading('Editando producto...')
        const editData = formDataEditProduct
        
        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'PUT',
        })
        
        if (!response.ok){
            toast.dismiss()
            toast.error("Error al editar producto!")
        }else{
            toast.dismiss()
            toast.success('Producto editado correctamente.')
            setFormDataEditProduct({product: '', description: '', stock: '', image: ''})
            editRef.current.reset()
        }

    }
    
    // Evento de Borrar producto.
    const deleteProduct = async (event) => {
        event.preventDefault();
        toast.loading('Eliminando producto...')
        const deleteData = event.target.value
        
        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'DELETE',
        })
        
        if (!response.ok){
            toast.dismiss()
            toast.error("Error al eliminar producto!")
        }else{
            toast.dismiss()
            toast.success('Producto eliminado correctamente.')

            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(fetchedData => setData(fetchedData))
                .catch(error => console.log("No andamos josha, error en fetch de home."))
        }

    } 

    // Cargar los productos.
    useEffect(() => {
        fetch('https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/producto')
            .then(response => response.json())
            .then(fetchedData => setData(fetchedData))
            .catch(error => console.log("No andamos josha, error en fetch de home."+error))
    }, []);

    // Evento de editar productos de la tabla.
    const handleRowClick = (id) => {
        console.log(data[id-1])
        setRowData(data[id-1]);
      };
      console.log(data)
    return(
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            <NavbarAdmin/>
            <div className="container mt-5">
                <div className='row'>

                    {/* Añadir producto */}
                    <div className="col-6 justify-content-center">
                        <form ref={addRef} onSubmit={addProduct}>
                            <div className="card px-5 py-5" id="form1">
                                <div className='card-title'>
                                    <h2 className='mx-auto'>Añadir producto</h2>
                                </div>
                                <div className="form-data" >
                                    <div className="mb-4">
                                        <span className="form-label">Nombre del producto</span>
                                        <input className="form-control" type="text" name='product' required onChange={handleChangeAddProduct}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Categoria</span>
                                        <input className="form-control" type="text" name='categoria' required onChange={handleChangeAddProduct}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Descripción</span>
                                        <input className="form-control" type="text" name='description' required onChange={handleChangeAddProduct}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Stock</span>
                                        <input className='form-control col' name='stock' type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value))} min={0} required onBlur={handleChangeAddProduct}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Precio</span>
                                        <input className='form-control col' name='precio' type="number" min={0} required onBlur={handleChangeAddProduct}/>
                                    </div>
                                    <div className='mb-4'>
                                        <span className='form-label'>Imagen</span>
                                        <input className='form-control col' name='image' type="file" accept='.png' required onChange={handleChangeAddProduct}/>
                                    </div>
                                    <div className='text-center'>
                                        <button type="submit" className='btn btn-success'>Añadir</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                   
                    {/* Editar producto */}
                    <div className="col-6 justify-content-center">
                        <form ref={editRef} action={editProduct}></form>
                        <div className="card px-5 py-5" id="form1">
                            <div className='card-title'>
                                <h2 className='mx-auto'>Editar producto</h2>
                            </div>
                            <div className="form-data" >
                                <div className="mb-4">
                                    <span className="form-label">Nombre del producto</span>
                                    <input className="form-control" type="text" name='product' value={rowData.title} required onChange={handleChangeEditProduct}/>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Categoria</span>
                                    <input className="form-control" type="text" name='categoria' required onChange={handleChangeAddProduct}/>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Descripción</span>
                                    <input className="form-control" type="text" name='description' value={rowData.body} required onChange={handleChangeEditProduct}/>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Stock</span>
                                    <input className='form-control col' type="number" value={valueEdit} onChange={(e) => setValueEdit(parseInt(e.target.value))} min={0} required onBlur={handleChangeEditProduct}/>
                                </div>
                                <div className="mb-4">
                                        <span className="form-label">Precio</span>
                                        <input className='form-control col' name='precio' type="number" min={0} required onBlur={handleChangeAddProduct}/>
                                    </div>
                                <div className='mb-4'>
                                    <span className='form-label'>Imagen</span>
                                    <input className='form-control col' type="file" accept='.png' required onChange={handleChangeEditProduct}/>
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className='btn btn-primary' onClick="">Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla de los productos */}
            <div className='container mt-5'>
                <table className="py-4 my-4 table table-stripped">
                    <thead>
                        <tr className='text-center'>
                            <th scope='col'>#</th>
                            <th scope='col'>Nombre</th>
                            <th>Categoria</th>
                            <th scope='col'>Descripcion</th>
                            <th scope='col'>Stock</th>
                            <th scope='col'>Precio</th>
                            <th scope='col'>Image</th>
                            <th scope='col'>Edit</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr>
                                <th scope='col' className='text-center'>{item.ID}</th>
                                <td>{item.Nombre}</td>
                                <td>{item.Categoria}</td>
                                <td>{item.Descripcion}</td>
                                <td>{item.Stock}</td>
                                <td>${item.Precio}</td>
                                <td><img src={`/img/${data.id}`} className="card-img-top"/></td>
                                <td><button className='btn btn-primary' onClick={() => handleRowClick(item.id)}><FaPencilAlt/></button></td>
                                <td>
                                    <form onSubmit={deleteProduct}>
                                        <input type="hidden" name='id' value={item.id}/>
                                        <button type='submit' className='btn btn-danger'><FaTrash/></button>
                                    </form>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}