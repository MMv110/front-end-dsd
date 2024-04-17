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
                  <Link to={'/'}><div className="mb-3"> <button className="btn btn-dark w-100">Sign in</button> </div></Link>
                  <Link to={'/'}><div className="mb-3"> <p className="text-center">Log in</p> </div></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}