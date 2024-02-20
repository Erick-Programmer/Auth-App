//funções sincronas que atualizam o estado.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//Get user do local storage

const user = JSON.parse(localStorage.getItem('user'))

//estado inicial do objeto
const initialState = {
    user: user ? user : null,
    isError: false,
    isSucess: false,
    IsLoading: false,
    message: "",
}

//Registro de Usuário
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error){
            const message = 
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
                return thunkAPI.rejectWithValue(message); //solicitação rejeitada envia o valor por message e contabilizado por payload
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.IsLoading = false
            state.isSucess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.IsLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.IsLoading = false
                state.isSucess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.IsLoading = false
                state.isError = true
                state.message = action.payload //ao rejeitar, o payload contabiliza definindo o estado em state.message
                state.user = null //dando errada a solicitação é registrado como nulo no registro.
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer