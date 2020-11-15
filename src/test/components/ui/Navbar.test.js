import React from 'react';
import { AuthContext } from '../../../components/auth/AuthContext';
import { mount } from 'enzyme';
import { Navbar } from '../../../components/ui/Navbar';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../../components/types/types';
import '@testing-library/jest-dom';

describe('Pruebas en Navbar', () => {
    
    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }

    const context = {
        dispatch: jest.fn(),
        user:{
            logged: true,
            name: 'Jose Enrique'
        }
    }

    const wrapper = mount(
     
        <AuthContext.Provider value={ context }>
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar/>
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Jose Enrique');
    })
    
    test('debe de llamar el logout y user el history', () => {
        
        wrapper.find('button').simulate('click');

        expect(context.dispatch).toHaveBeenCalledWith({type: types.logout});
        expect( historyMock.replace ).toHaveBeenCalledWith('/login')
    })
    


})
