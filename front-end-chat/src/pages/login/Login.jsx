import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const loginHandler = async (e) => {
        e.preventDefault();
        const config = {
            header: {
                "Content-Type": "application/json "
            }
        }
        try {
            const { data } = await axios.post("http://localhost:5000/auth/login", { username, password }, config)
            const obj = {"token" :data.token ,"id":data._id}
            localStorage.setItem("user",JSON.stringify(obj))
            navigate("/chat");


        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => { setError("error") }, 5000)
        }
    }

    return (
        <div className='login'>
            <h1>Login
                {error ? <h6 style={{ color: "red" }}>{error}</h6> : ""}
            </h1>

            <form onSubmit={loginHandler}>
                <div className="txt_field">
                    <input type="username" required onChange={(e) => setUsername(e.target.value)} value={username} />
                    <span></span>
                    <label>username</label>
                </div>
                <div className="txt_field">
                    <input type="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                    <span></span>
                    <label>Password</label>
                </div>

                <input type="submit" value="Login" className='button-log' />

            </form>
        </div>


    )
}

export default Login