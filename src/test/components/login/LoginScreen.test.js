import React from 'react';
import { AuthContext } from '../../../components/auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';
import { types } from '../../../components/types/types';


describe('Pruebas en LoginScreen', () => {
    
    const context = {
        dispatch: jest.fn()
    }

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={ context }>
            <LoginScreen history={historyMock} />
        </AuthContext.Provider>
    )

    Storage.prototype.getItem = jest.fn();

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe de realizar el dispatch y la navegacion', () => {
        wrapper.find('button').simulate('click')

        expect(context.dispatch).toHaveBeenCalledWith({ type: types.login, payload: { name:  'Jose Enrique'}})
        expect(historyMock.replace).toHaveBeenCalledWith('/')
        expect(localStorage.getItem).toHaveBeenCalledWith('lastPath');
    })
    
    

})
