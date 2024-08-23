import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Login() {
  return (
    <div className="container">
      {/* <!-- Section: Design Block --> */}
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>

                  <div className="form-outline mb-4">
                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="typeEmailX-2">
                      Email
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Password
                    </label>
                  </div>

                  {/* <!-- Checkbox --> */}
                  <div className="form-check d-flex justify-content-start mb-4">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                    <label className="form-check-label" htmlFor="form1Example3">
                      Remember password
                    </label>
                  </div>
                  <Link style={{ textDecoration: "none" }} to={"/dashboardAdmin"}>
                  <button className="btn btn-primary btn-lg btn-block" >
                    Login
                  </button>
                  </Link>

                  <hr className="my-4" />

                  <button className="btn btn-lg btn-block btn-primary" style={{ backgroundColor: '#dd4b39' }} type="submit">
                    <i className="fab fa-google me-2"></i> Sign in with google
                  </button>
                  <button className="btn btn-lg btn-block btn-primary mb-2" style={{ backgroundColor: '#3b5998' }} type="submit">
                    <i className="fab fa-facebook-f me-2"></i> Sign in with facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Login;
