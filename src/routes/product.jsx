import { React, useState, useEffect } from 'react';
import Navbar from "./navbar"
import { Link, useParams } from 'react-router-dom'

export default function(){

    const { id } = useParams()
    
    const [ data, setData ] = useState([])
    
    const [ value, setValue ] = useState(0)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(fetchedData => setData(fetchedData[id]))
            .catch(error => console.log("No andamos josha, error en fetch de producto: "+error))
    }, []);

    console.log(data);
    return(
        <>
            <Navbar/>
            <div className="col-10 mx-auto">
                    <div className="card">
                        <img src={`/img/${data.id}`} className="card-img-top"/>
                    <div className="card-body">
                        <h5 className='text-center'>{data.title}</h5>
                        <p className="card-text">{data.body}</p>
                        <div className='text-center row col-4 mx-auto'>
                            <input className='form-control col' type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value))} min={0}/>
                            <Link to='/home' className='btn btn-primary col-auto'>
                                Añadir
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}