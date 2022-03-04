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

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, pass: password})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception){
      
    }
  }

  const loginFormProps = {
    username: username,
    setUsername: setUsername,
    password: password,
    setPassword: setPassword,
    handleLogin: handleLogin
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      
        {user===null && <LoginForm {...loginFormProps} />}
        {user !== null && <h2>{user.name} is logged in</h2>}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App