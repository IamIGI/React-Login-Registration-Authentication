import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'; //location save the url where user wants to go.

    const userRef = useRef();
    const errRef = useRef();

    // const [user, setUser] = useLocalStorage('user', ''); //useState('');     //save data between refresh
    const [user, resetUser, userAttribs] = useInput('user', '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

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
            //setUser('');
            resetUser();
            setPwd('');
            navigate(from, { replace: true }); //replace actuall page with 'from'
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

    // const togglePersist = () => {
    //     setPersist((prev) => !prev);
    // };
    // useEffect(() => {
    //     localStorage.setItem('persist', persist);
    // }, [persist]);

    return (
        <>
            <section>
                <p reg={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                    {errMsg} {/* aria-live - feedback loop when something change in region */}
                </p>
                <h1>Sing In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" ref={userRef} autoComplete="off" {...userAttribs} required />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button> Sign In </button>
                    <div className="persistCheck">
                        <input type="checkbox" id="persist" onChange={toggleCheck} checked={check} />
                        <label htmlFor="persist">Trust this device</label>
                    </div>
                </form>
                <p>
                    Need and account? <br />{' '}
                    <span className="line">
                        {/*router link there */}
                        <a href="#">Sign Up</a>
                    </span>
                </p>
            </section>
        </>
    );
};

export default Login;
