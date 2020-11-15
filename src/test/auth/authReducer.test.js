import '@testing-library/jest-dom'
import { authReducer } from '../../components/auth/authReducer'
import { types } from '../../components/types/types'

describe('Pruebas en authReducer', () => {
    
    test('debe de retornar el estado por defecto', () => {
        const state = authReducer({logged: false},{})
        expect(state).toEqual({logged: false})
    })
    
    test('debe de autenticar y colocar el name del usuario', () => {
        const action = { 
            type: types.login,
            payload: {
                name: 'Jose Enrique'
            }
        }

        const state = authReducer({}, action)
        expect(state).toEqual({
            logged: true,
            name: 'Jose Enrique'
        })

    })

    test('debe de borrar el name del usuario y logged en false', () => {
        const action = { 
            type: types.logout,
        }

        const state = authReducer({}, action)
        expect(state).toEqual({logged: false})
    })

})
