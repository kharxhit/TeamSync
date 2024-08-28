import { useEffect, useState } from "react"
import useSignUp from "../../hooks/useSignUp"
import { useHistory, useNavigate } from 'react-router-dom';
import './Signup.css'
import lottie from 'lottie-web';


const SignUp = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prevSlide) => (prevSlide + 1) % 3);
        }, 3300);

        return () => {
            clearInterval(interval);
        };
    }, []);
    if (activeSlide === 0) {
        const animation1 = lottie.loadAnimation({
            container: document.getElementById('animation1'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets4.lottiefiles.com/packages/lf20_dn6rwtwl.json'
        });
    }
    else if (activeSlide === 1) {

        const animation2 = lottie.loadAnimation({
            container: document.getElementById('animation2'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets4.lottiefiles.com/packages/lf20_CgL682.json'
        });
    }
    else {
        const animation3 = lottie.loadAnimation({
            container: document.getElementById('animation3'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets3.lottiefiles.com/private_files/lf30_rruzda2a.json'
        });
    }
    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')

    const { signup, isLoading, error } = useSignUp()


    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password, image, name)
        navigate("/login");
    }

    return (
        <div className="Signup">
            <div id="container">
                <div id="left-side">
                    <div id="Leftcontainer">
                        <div style={{ display: "flex" }}>
                            <img id="logo" src="https://www.clipartmax.com/png/small/413-4139811_transparent-background-cool-logo.png" alt="TeamSync Logo" />
                            <h1>TeamSync</h1>
                        </div>
                        <div id="slides-container">
                            <div className={`slide ${activeSlide === 0 ? 'active' : ''}`}>
                                <div className="box">
                                    <div id="animation1"></div>
                                </div>
                                <p className="slide-text">Welcome to TeamSync!</p>
                            </div>
                            <div className={`slide ${activeSlide === 1 ? 'active' : ''}`}>
                                <div className="box">
                                    <div id="animation2"></div>
                                </div>
                                <p className="slide-text">Secured Information.</p>
                            </div>
                            <div className={`slide ${activeSlide === 2 ? 'active' : ''}`}>
                                <div className="box">
                                    <div id="animation3"></div>
                                </div>
                                <p className="slide-text">Achieve more together.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="right-side">
                    <h2>Create an Account</h2>
                    <form action="/login" onSubmit={handleSubmit}>
                        <label for="name">Name</label>
                        <input type="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name} required />
                        <label for="email">Email</label>
                        <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} required />
                        <label for="password">Password</label>
                        <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} required />
                        <label for="image">Image Link</label>
                        <input type="name"
                            onChange={(e) => setImage(e.target.value)}
                            value={image} required />
                        <input type="submit" value="Sign Up" disabled={isLoading} />
                    </form>
                    <div className="redirect-link">
                        <p>Already have an account? <a href="/login">Log in here</a>.</p>
                    </div>
                    {error && <div classNameName="error">{error}</div>}
                </div>
            </div>
        </div>

    )
}

export default SignUp