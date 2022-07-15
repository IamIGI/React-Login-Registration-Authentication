import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';

import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //Start website with focus
    useEffect(() => {
        userRef.current.focus();
    }, []);
    //clear Errors
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //axios throw error from response if exists, axios converting response to JSON
            const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Logged in</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p reg={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                        {errMsg} {/* aria-live - feedback loop when something change in region */}
                    </p>
                    <h1>Sing In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button> Sign In </button>
                    </form>
                    <p>
                        Need and account? <br />{' '}
                        <span className="line">
                            {/*routet link there */}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Login;
