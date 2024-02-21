
//sinal para ver quando o usuário estiver logado e saido
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth) //seleciona o estado e desestrutura variável

    const onLogout = () => {
        dispatch(logout()) //desloga
        dispatch(reset()) //reseta
        navigate('/') //ir para pagina inicial
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Cadastro de Usuário</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt/> Logout
                        </button>   
                    </li>
                ) : (
                <>
                    <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>   
                    </li>
                    <li>
                    <Link to='/register'>
                        <FaUser />Register
                    </Link>   
                    </li>
                </>
                )}
                
            </ul>
        </header>
        
   )
}

export default Header