import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUser') //remove user from local storage
    setUser(null) //remove user from state
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, pass: password})
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
    } catch(exception){
      setErrorMessage("Wrong Credentials")
      setTimeout(()=>setErrorMessage(null), 5000)
    }
  }

  const loginFormProps = {
    username: username,
    setUsername: setUsername,
    password: password,
    setPassword: setPassword,
    handleLogin: handleLogin
  }

  useEffect(() => { //get blogs
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => { //if user saved in browser, log in
    const userJSON = window.localStorage.getItem('blogAppUser')
    if (userJSON) {
      setUser(JSON.parse(userJSON))
    }
  }, [])
  return (
    <div>
      {errorMessage && <h1>{errorMessage}</h1>}
      {user===null && <LoginForm {...loginFormProps} />}
      {user !== null && <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App