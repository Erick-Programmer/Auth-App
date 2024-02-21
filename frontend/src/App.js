//Router para criar rotas, Routes definir as rotas e Route a rota!
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { Provider } from 'react-redux'
import store from './app/store'

function App() {
  return (
    //pode ser usado { fragment } ou <> </> from 'react' para envolver os items e tornar mais performático
    //store para hookar aplicações de maneira correta com os redutores.
    <>
      <Provider store={store}>
        <Router>
          <div className='container'>
          <Header></Header>
            <Routes>
              <Route path='/' element={<Dashboard/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/register' element={<Register/>}></Route>
            </Routes>
          </div>
        </Router>
        <ToastContainer></ToastContainer>
      </Provider>
    </>
  );
}

export default App;
