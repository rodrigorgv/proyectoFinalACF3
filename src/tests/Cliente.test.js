import React from 'react';
import { render, screen } from '@testing-library/react';
import Cliente from './Cliente'; // Ajusta la ruta según tu estructura de carpetas
import apiService from '../services/services'; // Ajusta la ruta según tu estructura de carpetas

// Mock de apiService
jest.mock('../services/services');

describe('Cliente Component', () => {
  beforeEach(() => {
    // Configura el mock para que devuelva una respuesta
    apiService.getClientes.mockResolvedValue([
      { id: 1, CLI_NOMBRE: 'Cliente 1', CLI_CORREO: 'cliente1@example.com', CLI_NIT: '123456789' },
      { id: 2, CLI_NOMBRE: 'Cliente 2', CLI_CORREO: 'cliente2@example.com', CLI_NIT: '987654321' },
    ]);
  });

  it('renders the component and fetches client data', async () => {
    render(<Cliente />);

    // Verificar que se renderiza el título
    expect(screen.getByText(/Clientes/i)).toBeInTheDocument();

    // Esperar a que se carguen los datos de los clientes
    const cliente1 = await screen.findByText('Cliente 1');
    const cliente2 = await screen.findByText('Cliente 2');

    // Verificar que los datos de los clientes están en el documento
    expect(cliente1).toBeInTheDocument();
    expect(cliente2).toBeInTheDocument();
  });
});
