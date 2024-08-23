
import React from 'react';
import { Link } from "react-router-dom";

function CardComponent({ title, iconClass, quantity, tipoTexto,enlace, tipoBorde }) {
  return (

    <div class="col-xl-3 col-md-6 mb-4 card-hover-effect">
      <div className={`card ${tipoBorde} shadow h-100 py-2`}>
        <Link to={enlace} style={{textDecoration: "none"}}>
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div className={`text-xs font-weight-bold ${tipoTexto} text-uppercase mb-1`}>
                  {title}
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">{quantity}</div>
              </div>
              <div class="col-auto">
                <i className={`${iconClass} fa-2x text-gray-600`}></i>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>

  );
}

export default CardComponent;
