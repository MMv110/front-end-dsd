import { React } from 'react';
import { Link } from "react-router-dom";

export default function Root() {

  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card px-5 py-5" id="form1">
              <form onSubmit={handlerRegistration}>
              <div className="form-data" >
                  <div className="mb-4">
                  <div className="mb-4">
                    <span className="form-label">Nombre</span>
                    <input className="form-control" name='nombre' autocomplete="off" type="text" onBlur={setNombre}/>
                  </div>
                    <span className="form-label">Email or username</span>
                    <input className="form-control" name='email' autocomplete="off" type="email" onBlur={setEmail}/>
                  </div>
                  <div className="mb-4">
                    <span className="form-label">Password</span>
                    <input className="form-control" name='password' autocomplete="off" type="password" onBlur={setPassword}/>
                  </div>
                  <div className="mb-4">
                    <span className="form-label">Confirmar Password</span>
                    <input className="form-control" name='password2' autocomplete="off" type="password" onBlur={setCPassword}/>
                  </div>
                  <div className="mb-4">
                    <span className="form-label">Dirección</span>
                    <input className="form-control" name='direccion' autocomplete="off" type="text" onBlur={setDireccion}/>
                  </div>
                  <div className="mb-3"> <button type='submit' className="btn btn-dark w-100">Sign in</button> </div>
                  <Link to={'/'}><div className="mb-3"> <p className="text-center">Log in</p> </div></Link>
                  
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}