import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

const modal = {
        show: 'true',
        title: 'Add Webpage',
        fieldNames: [
            {value: 'Repository:', placeholder: 'Your Repository Name', type: 'repositories'},
            {value: 'Project Branch:', default: 'hugo-project', placeholder: 'Your Hugo Project Branch Name', type: 'projectBranch'},
            {value: 'Public Branch:', default: 'master', placeholder: 'Your Public Branch Name', type: 'publicBranch'}
        ],
        closeButton: 'Cancel',
        saveButton: 'Add Webpage',
        type: 'addRepository'
}

/**
 * A repository is considered to be the group formed by a remote repository
 * and a remote branch. In the context of the frontend this grouping is called
 * an webpage.
 */
class RepositorySection extends Component{
    onClick(e) {
        e.preventDefault();
        this.props.setModal(modal);
    }
    render() {
        return(
            <div id='repository-section'>
                <Button onClick={this.onClick.bind(this)} bsSize='small' className='btn'><Glyphicon glyph='plus'/> Add Webpage</Button>
            </div>
        )
    }
}

RepositorySection.propTypes = {
    setModal: React.PropTypes.func.isRequired
}

export default RepositorySection
