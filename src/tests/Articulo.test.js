import React from 'react';
import { render, screen } from '@testing-library/react';
import Articulo from '../Pages/articulo'; // Asegúrate de que la ruta sea correcta
import apiService from '../services/services';
import '@testing-library/jest-dom/extend-expect';

// Mock del servicio apiService
jest.mock('../services/services');

describe('Articulo Component', () => {
  beforeEach(() => {
    // Simulando la respuesta del servicio para getArticulos
    apiService.getArticulos.mockResolvedValue([
      { id: 1, ART_NOMBRE: 'Articulo 1', ART_PRECIO: 100, ART_STOCK: 10, ART_CODIGO_DE_BARRA: '123456' },
    ]);

    // Si deseas simular otras respuestas para otros métodos
    apiService.getUnidadesMedida.mockResolvedValue([]);
    apiService.getCategorias.mockResolvedValue([]);
    apiService.getAreas.mockResolvedValue([]);
  });

  test('renders the Articulo component and fetches articles', async () => {
    render(<Articulo />);

    // Verifica que el título se renderice correctamente
    expect(screen.getByText(/Artículos/i)).toBeInTheDocument();

    // Verifica que el Navbar se renderice
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Espera a que se resuelva la llamada y que el artículo esté en el DOM
    const articuloElement = await screen.findByText(/Articulo 1/i);
    expect(articuloElement).toBeInTheDocument();
  });
});
