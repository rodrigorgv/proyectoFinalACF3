// CajasCobro.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import CajasCobro from './CajasCobro';
import apiService from '../services/services';

// Mock del servicio apiService
jest.mock('../services/services');

describe('CajasCobro Component', () => {
  beforeEach(() => {
    // Limpia el mock antes de cada prueba
    jest.clearAllMocks();
  });

  test('renders CajasCobro component correctly', async () => {
    // Simular la respuesta de la API
    apiService.getCajasCobro.mockResolvedValueOnce([
      { id: 1, CAC_IDSME: 123, CAC_IDEMP: 456, CAC_NO_CAJA: 'Caja 1' },
      { id: 2, CAC_IDSME: 789, CAC_IDEMP: 101, CAC_NO_CAJA: 'Caja 2' },
    ]);

    // Renderizar el componente
    render(<CajasCobro />);

    // Verificar que el título se renderiza
    const titleElement = screen.getByText(/Cajas de Cobro/i);
    expect(titleElement).toBeInTheDocument();

    // Verificar que el botón de crear caja se renderiza
    const createButton = screen.getByRole('button', { name: /Crear Caja de Cobro/i });
    expect(createButton).toBeInTheDocument();
  });

  test('fetches and displays cajas de cobro', async () => {
    // Simular la respuesta de la API
    apiService.getCajasCobro.mockResolvedValueOnce([
      { id: 1, CAC_IDSME: 123, CAC_IDEMP: 456, CAC_NO_CAJA: 'Caja 1' },
      { id: 2, CAC_IDSME: 789, CAC_IDEMP: 101, CAC_NO_CAJA: 'Caja 2' },
    ]);

    // Renderizar el componente
    render(<CajasCobro />);

    // Verificar que los datos de cajas de cobro se muestran en la tabla
    const caja1 = await screen.findByText('Caja 1');
    const caja2 = await screen.findByText('Caja 2');

    expect(caja1).toBeInTheDocument();
    expect(caja2).toBeInTheDocument();
  });

  test('handles error when fetching cajas de cobro', async () => {
    // Simular un error en la API
    apiService.getCajasCobro.mockRejectedValueOnce(new Error('Error al obtener datos'));

    // Renderizar el componente
    render(<CajasCobro />);

    // Verificar que se muestra un mensaje de error
    const errorAlert = await screen.findByText('No se pudo obtener la información necesaria.');
    expect(errorAlert).toBeInTheDocument();
  });
});
