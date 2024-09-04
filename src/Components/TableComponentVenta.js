import React from 'react'

export const TableComponentVenta = () => {
  return (
    <table class="table table-hover">
    <thead>
<tr>
  <th scope="col">#</th>
  <th scope="col">Producto</th>
  <th scope="col">Cantidad</th>
  <th scope="col">Valor unitario</th>
  <th scope="col">Valor Total</th>
</tr>
</thead>
<tbody>
<tr>
  <th scope="row">1</th>
  <td>Queso</td>
  <td>2</td>
  <td>4.5</td>
  <td>9.0</td>
</tr>
<tr>
  <th scope="row">2</th>
  <td>Queso</td>
  <td>2</td>
  <td>4.5</td>
  <td>9.0</td>
</tr>
<tr>
  <th scope="row">3</th>
  <td>Queso</td>
  <td>2</td>
  <td>4.5</td>
  <td>9.0</td>
</tr>
</tbody>
</table>
  )
}

export default TableComponentVenta;
