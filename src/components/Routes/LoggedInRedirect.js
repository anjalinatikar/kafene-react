import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuth } from '../../utils/auth';

function LoggedInRedirect({ path, Component }) {
    return (
        <Route path={path} exact
            render={props => isAuth() ?
                <Redirect to="/orders" /> :
                <Component {...props} />
            
            }
        />        
    )
}

export default LoggedInRedirect;