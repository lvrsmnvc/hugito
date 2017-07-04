import React, {Component} from 'react';

class Repository extends Component{
    render(){
        const {repository} = this.props;
        return (
            <li id='repository-entry'>
                <a>
                    {repository.repositoryName}
                </a>
            </li>
        )
    }
}

Repository.propTypes = {
    repository: React.PropTypes.object.isRequired,
    setRepository: React.PropTypes.func.isRequired
}

export default Repository
