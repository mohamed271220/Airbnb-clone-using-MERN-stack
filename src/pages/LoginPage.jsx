import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');


    const handleLoginSubmit = async (ev) => {
        ev.preventDefault();
        try {
            await axios.post('/login', { email, password });
            alert("Login successfully");
        }
        catch (err) {
            alert("Login Failed");
        }
    }


    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form action="" className='max-w-md mx-auto ' onSubmit={handleLoginSubmit}>
                    <input type="email" name="" id="" placeholder='Example@example.com'
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input type="password" name="password" id="password" placeholder='Your password goes here'
                        value={password}
                        onChange={ev =>  setPassword(ev.target.value) }
                    />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500'>
                        Don't have an account yet? <Link className='underline text-primary' to={'/register'}>
                            Register NOW!
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage