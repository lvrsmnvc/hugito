import React, { Component } from 'react';
import UserDropdown from './UserDropdown.jsx';

class UserSection extends Component{
    render(){
        return(
            <div id="user-section">
                <UserDropdown
                    {...this.props}
                />
            </div>
        )
    }
}

UserSection.propTypes = {
    user: React.PropTypes.object.isRequired,
    setUser: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired
}

export default UserSection
