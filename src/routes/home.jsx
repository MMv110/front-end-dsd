import Navbar from "./navbar"
import IMAGES from "../img/images"
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function(){

    const [data, setData ] = useState([])
    
    useEffect(() => {
        fetch('https://qdvmstye68.execute-api.us-east-1.amazonaws.com/dev/producto')
            .then(response => response.json())
            .then(fetchedData => setData(fetchedData))
            .catch(error => console.log("No andamos josha, error en fetch de home."+ error.message))
            
    }, []);
    console.log(data);
    return(
        <div>
            <Navbar/>
            
            <div className="row row-cols-1 row-cols-md-2 g-4">
            
            {data.map((item) => (
                
                <div className="col">
                    <div className="card">
                        <Link to={`/product/${item.ID}`}>
                        <img src={IMAGES[item.Nombre]} className="card-img-top"/>
                        </Link>
                    <div className="card-body">
                        <Link to={`/product/${item.ID}`} className="card-title">
                            <h5 >{item.Nombre} - {item.Categoria}</h5>
                        </Link>
                        <p className="card-text">{item.Descripcion}</p>
                    </div>
                </div>
            </div>
            ))}
            
            </div>
        </div>
    )
}