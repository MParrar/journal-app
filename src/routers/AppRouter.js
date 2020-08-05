import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { firebase } from '../components/firebase/firebase-config';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../components/actions/auth';
import { useState } from 'react';
import { PrivateRoute } from './PrivateRoute';
import { PublicRouter } from './PublicRouter';
import { startLoadingNotes } from '../components/actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid))
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false)
        })

    }, [dispatch, setChecking, setIsLoggedIn])


    if (checking) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRouter
                        isAuthenticated={isLoggedIn}
                        path="/auth"
                        component={AuthRouter}
                    />

                    <PrivateRoute
                        isAuthenticated={isLoggedIn}
                        exact
                        path="/"
                        component={JournalScreen}
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
