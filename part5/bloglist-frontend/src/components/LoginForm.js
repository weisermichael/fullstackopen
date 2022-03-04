import React from 'react';

const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => (
    <div>
        <h2>log in to application</h2>

        <form onSubmit={handleLogin}>
            <div>
                username<input type="text" value={username} onChange={({target}) => setUsername(target.value)}/>
            </div>
            <div>
                password<input type="text" value={password} onChange={({target}) => setPassword(target.value)}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
)

export default LoginForm