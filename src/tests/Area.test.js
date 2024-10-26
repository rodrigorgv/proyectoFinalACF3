import { render, screen } from '@testing-library/react';
import React from 'react';
import Area from '../Pages/area';
import apiService from '../services/services';
import Swal from 'sweetalert2';

jest.mock('../services/services'); // Mock del servicio API
jest.mock('sweetalert2'); // Mock de SweetAlert

test('debería renderizar el componente y obtener áreas al montarse', async () => {
  // Mock de los datos devueltos por getAreas
  const areasMock = [{ id: 1, ARA_DESCRIPCION: 'Área 1' }];
  apiService.getAreas.mockResolvedValue(areasMock); // Simula la respuesta del servicio

  render(<Area />); // Renderiza el componente

  // Verifica que el título se renderiza
  expect(screen.getByText('Áreas')).toBeInTheDocument();
});
