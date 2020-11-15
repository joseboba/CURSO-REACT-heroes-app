import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../components/auth/AuthContext';

describe('Pruebas en DashboardRoutes', () => {
    
    const context = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Jose Enrique'
        }
    }

    test('debe de mostrarse correctamente', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={ context }>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Jose Enrique');
    })
    

})
