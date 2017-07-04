import React, { Component } from 'react';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';

class UserDropdown extends Component{
    onSelect(value){
        const { logout } = this.props;
        switch(value) {
            case 'Logout':
                logout();
                break;
        }
    }
    render(){
        const {user} = this.props;
        return(
            <div id='user'>
                <DropdownButton bsSize='small' title={user.name} id='user-dropdown' pullRight className='dropdown-toggle btn' onSelect={this.onSelect.bind(this)}>
                    <MenuItem eventKey='Logout'>Logout</MenuItem>
                </DropdownButton>
            </div>
        )
    }
}

UserDropdown.propTypes = {
    user: React.PropTypes.object.isRequired,
    setUser: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired
}

export default UserDropdown
