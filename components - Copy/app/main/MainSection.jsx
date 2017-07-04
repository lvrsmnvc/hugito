import React, { Component } from 'react';
import ContentList from './ContentList.jsx';
import ContentEditor from './ContentEditor.jsx';
import Welcome from './Welcome.jsx';

class MainSection extends Component{
    render(){
        return(
            <div id='main-section'>
                { (this.props.showContent === 'true' && this.props.repositoryIsValid === 'true') ? <ContentList {...this.props}/> : null }
                { (this.props.showContentEditor === 'true' && this.props.repositoryIsValid === 'true') ? <ContentEditor {...this.props}/> : null }
                { this.props.repositoryIsValid === 'false' ? <Welcome /> : null }
            </div>
        )
    }
}

MainSection.propTypes = {
    showContent: React.PropTypes.string.isRequired,
    showContentEditor: React.PropTypes.string.isRequired,
    contentElements: React.PropTypes.array.isRequired,
    repositoryIsValid: React.PropTypes.string.isRequired,
    currentEditingContentElement: React.PropTypes.object.isRequired,
    listContent: React.PropTypes.func.isRequired,
    selectedRepository: React.PropTypes.object.isRequired,
    removeContent: React.PropTypes.func.isRequired,
    getFileContent: React.PropTypes.func.isRequired,
    setFileContent: React.PropTypes.func.isRequired
}

export default MainSection
