import React from 'react';
import { mount, shallow } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../components/auth/AuthContext';
import '@testing-library/jest-dom';


describe('Pruebas en AppRouter', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('debe de mostrar el login si no está autenticado ', () => {
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot();
    })
    
    test('debe de mostrar el componente de marvel', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Jose Enrique'
            }
        }
            const wrapper = mount(
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            )
            
            expect(wrapper.find('.navbar').exists()).toBe(true);
    })
    


})
