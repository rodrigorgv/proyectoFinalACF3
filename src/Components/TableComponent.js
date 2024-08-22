import React from 'react';
import DataTable from 'react-data-table-component'; // Importar DataTable

const TableComponent = ({ datostabla, columnas }) => {

  const customStyles = {
    rows: {
      style: {
        minHeight: '4rem', // override the row height
      },
    },
    headCells: {
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
      },
    },
  };

  const [records, setRecords] = React.useState(datostabla);

  function handleFilter(e) {
    const value = e.target.value;
    const filtered = datostabla.filter(record => {
      return record.nombre.toLowerCase().includes(value.toLowerCase());
    });
    setRecords(filtered);
  }
  return (
    <div class="contenedorPadre">
      <div className="contenedorHijo">
        {/* <div className="contenedorhijo2">
          <div><input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Ingrese un nombre a buscar" onChange={handleFilter} /></div>
        </div> */}
        <DataTable class="table-primary"
          columns={columnas}
          data={datostabla}
          customStyles={customStyles}
          fixedHeader
          pagination
        ></DataTable>
      </div>
    </div>
  );
};

export default TableComponent;