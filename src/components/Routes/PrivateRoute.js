import React   from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuth } from '../../utils/auth';

function PrivateRoute({ path, Component }) {

    return (
        <Route path={path} exact
        render={props => isAuth() ?
        <Component {...props}  /> :
        <Redirect to="/" />
        }
        />
        
    )
}

export default PrivateRoute;