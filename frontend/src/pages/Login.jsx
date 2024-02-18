//declarar estados
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
  //estado de nivel de componente
  //cada campo (uma parte separada do nosso estado) propriedade
  //definindo os dados do formulário pelo objeto.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  //variável desestruturada vinda dos dados do formulário.
  const { email, password } = formData  

  //aciona o estado anterior (setFormData)
  //copia o objeto (spread operator) de dentro do array setFormData.
  //selecionada as variáveis, coletar valor.
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  
  //dispara uma vez por clique.
  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt> Login</FaSignInAlt>
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email' //backend (selecionado por e.target.name pegando o valor.)
              value={email}
              placeholder='Enter your email'
              onChange={onChange}>
            </input>
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={onChange}>
            </input>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    
    </>
  )
}

export default Login