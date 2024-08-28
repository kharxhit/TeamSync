import { useState } from "react"
import useLogin from "../../hooks/useLogin"
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
        navigate("/");
        //window.location.reload();
    }

    return (
        <div className="wrappp">
            <div class="loginContainer">
                <div className="login-section">
                    <form className="login" onSubmit={handleSubmit} method={'post'}>
                        <h2>Log in</h2>

                        <label>Email:</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            id="email"
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="password"
                        />
                        <button className="LogInbutton"disabled={isLoading}>Log in</button>
                        {error && <div className="error">{error}</div>}
                    </form>
                    <Link to='/signUp' style={{"textDecoration":"none","color":"blue","marginTop":"10px"}}>Are you new to Project2023?</Link>
                </div>
                <div class="screenshots-section">
                    <h3 ><bold>TeamSync</bold></h3>
                    <div class="screenshot1"></div>
                    <div class="screenshot2"></div>
                    <div class="screenshot3"></div>
                </div>
            </div>

        </div>
    )
}

export default Login