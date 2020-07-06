import React, { useEffect, useState, } from 'react';
import 'bulma/css/bulma.css'
import { useAuth0 } from './contexts/auth0-context';

import Header from './components/Header';
import List from './components/List';
import withListLoading from './components/withListLoading';

import axios from 'axios';

function App() {
    const { isLoading, user, loginWithRedirect, logout } = useAuth0();

    const ListLoading = withListLoading(List);
    const [appState, setAppState] = useState({
        loading: false,
        repos: null,
    });

    useEffect(() => {
        setAppState({ loading: true });
        const apiUrl = `https://api.github.com/users/viniciusbenite/repos`;
        axios.get(apiUrl).then((repos) => {
            const allRepos = repos.data;
            setAppState({ loading: false, repos: allRepos });
        });
    }, [setAppState]);

    return (
        <>
            <Header />

            <div className="hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        {!isLoading && !user && (
                            <>
                                <h1>Click Below!</h1>
                                <button onClick={loginWithRedirect} className="button is-danger">
                                    Login
                                </button>
                            </>
                        )}
                        {!isLoading && user && (
                            <>
                                <h1>You are logged in!</h1>
                                <p>Hello {user.name}</p>
                                {user.picture && <img src={user.picture} alt="My Avatar" />}
                                <hr />
                                <div className='repo-container'>
                                    <ListLoading isLoading={appState.loading} repos={appState.repos} />
                                </div>
                                <button
                                    onClick={() => logout({ returnTo: window.location.origin })}
                                    className="button is-small is-dark"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
