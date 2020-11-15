import React from 'react';
import { SearchScreen } from '../../../components/search/SearchScreen';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';

describe('Pruebas en el SearchScreen', () => {

    test('debe de mostrarse correctamente con valores por defecto ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    })

    test('debe de mostrar a Batman y el input con el valor del query string', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        )

        expect(wrapper.find('input').prop('value')).toBe('batman');
    })

    test('debe de mostrar un error si no se encuentra el Hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman3445']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        )
        
        expect(wrapper.find('#error').text().trim()).toBe('Theres is not a hero with batman3445')
    })
    
    test('debe de mostrar el push del history', () => {
        
        const historyMock = {
            push: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={ () => <SearchScreen history={ historyMock } /> } />
            </MemoryRouter>
        )

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        })
        wrapper.find('form').simulate('submit', () => preventDefault())

        expect(historyMock.push).toHaveBeenCalledWith('?q=batman')
    })
    
    
    

})
