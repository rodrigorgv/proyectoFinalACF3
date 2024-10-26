import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Categoria from './Categoria'; // Ajusta la ruta según tu estructura de carpetas
import apiService from '../services/services'; // Ajusta la ruta según tu estructura de carpetas
import Swal from 'sweetalert2';

// Mocks
jest.mock('../services/services');
jest.mock('sweetalert2');

describe('Categoria Component', () => {
    beforeEach(() => {
        // Resetea el mock de apiService antes de cada prueba
        jest.clearAllMocks();
    });

    test('renders Categoria component and fetches categories', async () => {
        // Mock de la respuesta de la API
        const mockCategorias = [
            { id: 1, CAT_DESCRIPCION: 'Categoria 1' },
            { id: 2, CAT_DESCRIPCION: 'Categoria 2' }
        ];

        apiService.getCategorias.mockResolvedValue(mockCategorias);

        render(<Categoria />);

        // Verifica que el título se renderiza
        expect(screen.getByText(/Categorias/i)).toBeInTheDocument();

        // Espera a que se muestren las categorías
        await waitFor(() => {
            expect(screen.getByText(/Categoria 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Categoria 2/i)).toBeInTheDocument();
        });
    });
});
