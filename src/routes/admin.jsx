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
    const [ file, setFile ] = useState(null)

    // Definición de los useState de los formularios.
    const [formDataAddProduct, setFormDataAddProduct] = useState({
        ID: '',
        Nombre: '',
        Categoria: '',
        Descripcion: '',
        Stock: '',
        Precio: '',
        image: ''
    })
    const [formDataEditProduct, setFormDataEditProduct] = useState({
        ID: '',
        Nombre: '',
        Categoria: '',
        Descripcion: '',
        Stock: '',
        Precio: '',
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
        
        
        const response = await fetch(`https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/producto`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addData)
        })
        
        if (!response.ok){
            toast.dismiss()
            toast.error("Error al añadir producto!")
        }else{
            toast.dismiss()
            toast.success('Producto añadido correctamente.')
            setFormDataAddProduct({
                ID: '',
                Nombre: '',
                Categoria: '',
                Descripcion: '',
                Stock: '',
                Precio: '',
                image: ''})
            addRef.current.reset()
            window.location.reload()
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
        const { ID } = event.target
        let parts  = ID.value.split('#')
        const id = parts[parts.length - 1]
        
        const editData = formDataEditProduct

        console.log(editData)
    
        const response = await fetch(`https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/producto/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editData)
        })
        
        if (!response.ok){
        }else{
            setFormDataEditProduct({ID: '',
                Nombre: '',
                Categoria: '',
                Descripcion: '',
                Stock: '',
                Precio: '',
                image: ''})
                setTimeout(() => {
                    window.location.href = '/admin'
                }, 3000)
        }

    }
    
    // Evento de Borrar producto.
    const deleteProduct = async (event) => {
        event.preventDefault();
        const { id } = event.target
        let parts  = id.value.split('#')
        const idDelete = parts[parts.length - 1]

        const response = await fetch(`https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/producto/${idDelete}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        if (!response.ok){
            toast.dismiss()
            toast.error("Error al eliminar producto!")
        }else{
            toast.dismiss()
            toast.success('Producto eliminado correctamente.')
            window.location.reload()
        }

    } 

    const handleFileChange = (e) => {
        const { name } = e.target
        const file = e.target.files[0]
        setFormDataAddProduct((prevState) => ({ ...prevState, [name]: file}))
      };

    // Cargar los productos.
    useEffect(() => {
        fetch('https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/producto')
            .then(response => response.json())
            .then(fetchedData => setData(fetchedData))
            .catch(error => console.log("No andamos josha, error en fetch de home."+error))
    }, []);

    // Evento de editar productos de la tabla.
    const handleRowClick = (id) => {
        const productoEditable = data.find(producto => producto.ID === id);
        setRowData(productoEditable);
      };
    return(
        <>
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
                                        <input className="form-control" type="text" name='Nombre' required onChange={handleChangeAddProduct}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Categoria</span>
                                        <input className="form-control" type="text" name='Categoria' required onChange={handleChangeAddProduct}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Descripción</span>
                                        <input className="form-control" type="text" name='Descripcion' required onChange={handleChangeAddProduct}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Stock</span>
                                        <input className='form-control col' name='Stock' type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value))} min={0} required onBlur={handleChangeAddProduct}/>
                                    </div>
                                    <div className="mb-4">
                                        <span className="form-label">Precio</span>
                                        <input className='form-control col' name='Precio' type="number" min={0} required onBlur={handleChangeAddProduct}/>
                                    </div>
                                    <div className='mb-4'>
                                        <span className='form-label'>Imagen</span>
                                        <input className='form-control col' name='image' type="file" accept='.jpg' required onInput={handleFileChange}/>
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
                        <form ref={editRef} onSubmit={editProduct}>
                        <div className="card px-5 py-5" id="form1">
                            <div className='card-title'>
                                <h2 className='mx-auto'>Editar producto</h2>
                            </div>
                            <div className="form-data" >
                                <div className="mb-4">
                                    <input type="hidden" name="ID" value={rowData.ID} />
                                    <span className="form-label">Nombre del producto</span>
                                    <input className="form-control" type="text" name='Nombre' placeholder={rowData.Nombre} required onChange={handleChangeEditProduct}/>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Categoria</span>
                                    <input className="form-control" type="text" name='Categoria' placeholder={rowData.Categoria} required onChange={handleChangeEditProduct}/>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Descripción</span>
                                    <input className="form-control" type="text" name='Descripcion' placeholder={rowData.Descripcion} required onChange={handleChangeEditProduct}/>
                                </div>
                                <div className="mb-4">
                                    <span className="form-label">Stock</span>
                                    <input className='form-control col' name='Stock' type="number" placeholder={rowData.Stock} onChange={(e) => setValueEdit(parseInt(e.target.value))} min={0} required onBlur={handleChangeEditProduct}/>
                                </div>
                                <div className="mb-4">
                                        <span className="form-label">Precio</span>
                                        <input className='form-control col' name='Precio' type="number" placeholder={rowData.Precio} min={0} required onBlur={handleChangeEditProduct}/>
                                    </div>
                                <div className='mb-4'>
                                    <span className='form-label'>Imagen</span>
                                    <input className='form-control col' type="file" accept='.jpg' required onChange={handleChangeEditProduct}/>
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className='btn btn-primary'>Editar</button>
                                </div>
                            </div>
                        </div>
                        </form>
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
                                <td><button className='btn btn-primary' onClick={() => handleRowClick(item.ID)}><FaPencilAlt/></button></td>
                                <td>
                                    <form onSubmit={deleteProduct}>
                                        <input type="hidden" name='id' value={item.ID}/>
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