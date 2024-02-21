//ponto de serviço de autenticação
import axios from 'axios'

const API_URL = '/api/users/'

//registrar o usuário
const register = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)) //o que retorna do registro define user.
    }
    return response.data
}

//Login Usuário
const login = async(userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)) //o que retorna do registro define user.
    }
    return response.data
}

// função de Logout - remove o usuário do armazenamento local
const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    logout,
    login
}

export default authService