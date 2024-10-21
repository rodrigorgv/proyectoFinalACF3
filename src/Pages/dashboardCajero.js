import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Importa la librería de cookies
import CardComponent from '../Components/CardComponent';
import NavbarCajeroComponent from '../Components/NavbarCajeroComponent';
import apiService from '../services/services';
import Swal from 'sweetalert2';


const DashboardCajero = () => {
    const [userData, setUserData] = useState({});
    const [Empleados, setEmpleados] = useState({});
    const [nombreEmp, setNombreEmp] = useState(""); // Inicializar correctamente
    const [CajasCobro, setCajasCobro] = useState(""); // Inicializar correctamente
    const [NOCajaCobro,setNOCajaCobro] = useState(""); // Inicializar correctamente

    useEffect(() => {
        const user = Cookies.get('user'); // Obtener la cookie
        if (user) {
            try {
                const parsedUser = JSON.parse(user); // Parsear la cookie
                setUserData(parsedUser); // Guardar los datos en el estado
            } catch (error) {
                console.error('Error al parsear la cookie del usuario:', error);
            }
        }
    }, []); // Cargar datos del usuario solo una vez

    useEffect(() => {
        if (userData.empleado) { // Espera a que se cargue el empleado en userData
            const fetchData = async () => {
                try {
                    const dataEmpleados = await apiService.getEmpleados();
                    setEmpleados(dataEmpleados);
                    
                    // Filtrar por el id del empleado de la cookie
                    const dataEmpleadoFiltrado = dataEmpleados.filter(e => e.id == userData.empleado);

                    if (dataEmpleadoFiltrado.length > 0) {
                        setNombreEmp(dataEmpleadoFiltrado[0].EMP_NOMBRE);
                    } else {
                        console.log('No se encontró el empleado.');
                    }

                } catch (error) {
                    console.error('Error al obtener datos:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo obtener la información necesaria.',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                    });
                }
            };

            fetchData();
        }
    }, [userData]); // Ejecutar el fetch cuando userData se actualice

    useEffect(() => {
        if (userData.empleado) { // Espera a que se cargue el empleado en userData
            const fetchData = async () => {
                try {
                    const dataCajaCobro = await apiService.getCajasCobro();
                    setCajasCobro(dataCajaCobro);
                    
                    // Filtrar por el id del empleado de la cookie
                    const dataCACFiltrado = dataCajaCobro.filter(c => c.CAC_IDEMP == userData.empleado);

                    if (dataCACFiltrado.length > 0) {
                        setNOCajaCobro(dataCACFiltrado[0].id);
                    } else {
                        console.log('No se encontró LA CAJA COBRO.');
                    }

                } catch (error) {
                    console.error('Error al obtener datos:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo obtener la información necesaria.',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                    });
                }
            };

            fetchData();
        }
    }, [userData]); // Ejecutar el fetch cuando userData se actualice    
    
    return (
        <div>
            <NavbarCajeroComponent />
            <div className="container-fluid">
                <div className="titulo">
                    <h1>Cajero #{NOCajaCobro} | SUPERMK</h1>
                    <h3>Bienvenido {nombreEmp}</h3>
                </div>
                <div className="d-flex justify-content-center">
                    <CardComponent
                        title="Registrar Venta"
                        iconClass="fas fa-cart-plus"                        
                        enlace={"/venta"}
                        tipoTexto={"text-success"}
                        tipoBorde={"border-left-success"}
                    />
                    <CardComponent
                        title="Mis ventas"
                        iconClass="fa-solid fa-list-check"
                        enlace={"/ventasCajero"}
                        tipoTexto={"text-warning"}
                        tipoBorde={"border-left-warning"}
                    />

                </div>

            </div>
        </div>
    );
}

export default DashboardCajero;