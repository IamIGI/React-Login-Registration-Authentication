import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); //cancel request when component unmounts

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal, //optional object that allows to abort request
                });
                const userNames = response.data.map((user) => user.username);
                // console.log(response.data);
                isMounted && setUsers(userNames);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true }); // after user login again, he will comeback to this page
            }
        };

        getUsers();

        //cleanUp function (return exit from useEffect, so everything wrote inside will execute last )
        return () => {
            isMounted = false;
            controller.abort(); //cancel any request
        };
    }, []);

    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
        </article>
    );
};

export default Users;
