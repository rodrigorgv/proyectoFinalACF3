import React from 'react'

function CardEmpleado({ titulo, imagen }) {
  return (
    <div class="col card-hover-effect">
      <div class="card h-100">
        <img src={imagen} class="card-img-top" alt="test" />
        <div class="card-body">
          <h5 class="card-title " style={{ textAlign: "center" }}>{titulo}</h5>
        </div>
      </div>
    </div>
  )
}

export default CardEmpleado