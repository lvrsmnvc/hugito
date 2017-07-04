import React, { Component, PropTypes } from 'react';
import SocialButton from 'react-social-button';
import Authentication from '../utils/Authentication.jsx'

class GithubLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }
    onClick(e) {
        e.preventDefault();
        const { redirectUri, allowSignup, auth } = this.props;
        const clientId = auth.getClientId();
        const scope = auth.getScope();
        const state = auth.generateState();
        auth.setState(state);
        if (!this.state.isLoading) {
            const isLoading = true;
            this.setState({isLoading});
        }
        console.log('Scopes: ', scope);
        let url = 'https://github.com/login/oauth/authorize' + '?' +
            'client_id=' + clientId + '&' +
            'scope=' + scope + '&' +
            'redirect_uri=' + redirectUri + '&' +
            'state=' + state + '&' +
            'allow_signup=' + allowSignup;
        auth.callGithub(url);
    }
    render() {
        const { buttonText, cssClass } = this.props;
        const { isLoading } = this.state;
        return (
            <div>
                { this.props.cssClass != '' ?
                    <button className={cssClass} onClick={this.onClick.bind(this)}>{buttonText}</button>
                :
                    <SocialButton
                        social='github'
                        text={buttonText}
                        loading={isLoading}
                        btnProps={{
                            onClick: this.onClick.bind(this)
                    }}></SocialButton>
                }
            </div>
        );
    }
}

GithubLogin.propTypes = {
    auth: PropTypes.instanceOf(Authentication),
    cssClass: PropTypes.string,
    buttonText: PropTypes.string,
    redirectUri: PropTypes.string,
    allowSignup: PropTypes.string
}

GithubLogin.defaultProps = {
    buttonText: 'Login with Github',
    cssClass: '',
    redirectUri: '',
    allowSignup: 'true'
}

export default GithubLogin;
