import React, { Component, PropTypes } from 'react';
import SocialButton from 'react-social-button/lib/SocialButton.js';
import { Link } from 'react-router';
import GithubLogin from './GithubLogin.jsx';
import Authentication from '../utils/Authentication.jsx';

class Login extends Component{
    render(){
        const { auth, failedLogin } = this.props;
        return(
            <div id='login-page'>
                <div id='login-container'>
                    <img id='login-logo' src='../images/logo.png'></img>
                    <GithubLogin auth={auth}></GithubLogin>
                    <h5>Hugito is the content manager that brings you the content and just the content. No garbage attached. It is an open source project that aims to change the way people manage the content of their websites.</h5>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    auth: PropTypes.instanceOf(Authentication),
    failedLogin: PropTypes.string
}

export default Login
