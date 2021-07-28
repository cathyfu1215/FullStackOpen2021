/* eslint-disable no-unused-vars */
import React ,{ useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import ErrorNotification from'./ErrorNotification'
import SuccessNotification from'./SuccessNotification'

const LoginForm = ({ user,setUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleUsernameChange=({ target }) => setUsername(target.value)
  const handlePasswordChange=({ target }) => setPassword(target.value)


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setSuccessMessage(`${user.name} is logged in.`)
      setErrorMessage(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <ErrorNotification message={errorMessage}/>
      <SuccessNotification message={successMessage}/>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm