
//sinal para ver quando o usuário estiver logado e saido
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
//link para paginas elemento dom.
import {Link} from 'react-router-dom'

function Header() {
    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>GoalSetter</Link>
            </div>
            <ul>
                <li>
                 <Link to='/login'>
                    <FaSignInAlt>Login</FaSignInAlt>
                 </Link>   
                </li>
                <li>
                 <Link to='/register'>
                    <FaUser>Register</FaUser>
                 </Link>   
                </li>
            </ul>
        </header>
        
   )
}

export default Header