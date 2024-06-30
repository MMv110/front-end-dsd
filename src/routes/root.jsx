<<<<<<< HEAD
import { React, useState } from 'react';
import { Link } from "react-router-dom";

export default function Root() {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  
  const handleChange = (event) => {
    const { name, value } = event.target
    setData((prevState) => ({ ...prevState, [name]: value}))
    
  }

  
  const onSubmitHandler = async(event) => {
    event.preventDefault();
    
    const response = await fetch()
  }
  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card px-5 py-5" id="form1">
              <div className="form-data" >
                <form onSubmit={onSubmitHandler}>
                  <div className="mb-4">
                    <span className="form-label">Email or username</span> 
                    <input className="form-control" name='email' autocomplete="off" type="text" onBlur={handleChange}/>
                  </div>
                  <div className="mb-4">
                    <span className="form-label">Password</span> 
                    <input className="form-control" name='password' autocomplete="off" type="password" onBlur={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-dark w-100" type='submit'>Log in</button>
                  </div>
                  <Link to={'/sign-in'}><div className="mb-3"> <p className="text-center">Sign in</p> </div></Link>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
=======
import { React } from 'react';
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card px-5 py-5" id="form1">
              <div className="form-data" >
                  <div className="mb-4">
                    <span className="form-label">Email or username</span> 
                    <input className="form-control" autocomplete="off" type="text"/>
                  </div>
                  <div className="mb-4">
                    <span className="form-label">Password</span> 
                    <input className="form-control" autocomplete="off" type="password" />
                  </div>
                  <Link to={'/home'}><div className="mb-3"> <button className="btn btn-dark w-100">Log in</button> </div></Link>
                  <Link to={'/sign-in'}><div className="mb-3"> <p className="text-center">Sign in</p> </div></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
>>>>>>> 21bf2b28a18cf0353dda5616c812a24c5ae43b31
}