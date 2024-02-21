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
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() //tipos de log de erros
        
        return thunkAPI.rejectWithValue(message); //solicitação rejeitada envia o valor por message e contabilizado por payload
    }
})

//Login do usuário
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() //tipos de log de erros
        
        return thunkAPI.rejectWithValue(message); //solicitação rejeitada envia o valor por message e contabilizado por payload
    }
})

//logout do usuário
export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload //ao rejeitar, o payload contabiliza definindo o estado em state.message
                state.user = null //dando errada a solicitação é registrado como nulo no registro.
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSucess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload //ao rejeitar, o payload contabiliza definindo o estado em state.message
                state.user = null //dando errada a solicitação é registrado como nulo no login
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer