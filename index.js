import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import Login from './components/login/Login.jsx';
import Authentication from './components/utils/Authentication.jsx'
import App from './components/app/App.jsx';
import Container from './components/Container.jsx';

const auth = new Authentication();

const _requireAuth = (nextState, replace) => {
    if (!auth.isAuthenticated()) {
        // There is a need to check if an authentication process is in progress.
        auth.checkIfAuthenticating(window.location.href);
        replace({ pathname: '/login' });
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Container} auth={auth} >
            <IndexRedirect to="/app" />
            <Route path="/app" component={App} onEnter={_requireAuth} />
            <Route path="/login" component={Login} />
        </Route>
    </Router>,
    document.getElementById('app')
);
