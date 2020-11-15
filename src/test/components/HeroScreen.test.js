import React from 'react';
import { HeroScreen } from '../../components/heroes/HeroScreen';
import { mount } from 'enzyme'
import '@testing-library/jest-dom'
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en HeroScreen', () => {
    
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    
    
    test('debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']} >
                <HeroScreen history={ history }/>
            </MemoryRouter>    
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('Redirect').exists()).toBe(true)
    })
    
    test('debe de mostrar un hero si el parámetro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']} >
                <Route path="/hero/:heroeId"  component={ HeroScreen } />
            </MemoryRouter>    
        )

        expect(wrapper.find('.row').exists()).toBe(true)
    })
    
    test('debe de regresar a la pantalla anterior con PUSH', () => {
        
        const history = {
            length: 0,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']} >
                <Route path="/hero/:heroeId"  component={ () => <HeroScreen history ={ history } /> } />
            </MemoryRouter>    
        )

        wrapper.find('button').simulate('click')
        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();
    })

    test('debe de regresar a la pantalla anterior con goBack', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']} >
                <Route path="/hero/:heroeId"  component={ () => <HeroScreen history ={ history } /> } />
            </MemoryRouter>    
        )

        wrapper.find('button').simulate('click')
        expect(history.push).not.toHaveBeenCalled();
        expect(history.goBack).toHaveBeenCalled();
    })

    test('debe de llamar al redirect si el hero no existe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvelfafklasdjf;a']} >
                <Route path="/hero/:heroeId"  component={ () => <HeroScreen history ={ history } /> } />
            </MemoryRouter>    
        )

        expect(wrapper.text()).toBe('');
    })
    
})
