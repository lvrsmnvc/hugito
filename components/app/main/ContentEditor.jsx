import React, { Component } from 'react';
import MarkdownEditor from './MarkdownEditor.jsx';

class ContentEditor extends Component {
    render() {
        return (
            <MarkdownEditor
                contentElement={this.props.currentEditingContentElement}
                setFileContent={this.props.setFileContent}
                filterContentHeader={this.props.filterContentHeader}
            />
        )
    }
}

ContentEditor.propTypes = {
    currentEditingContentElement: React.PropTypes.object.isRequired,
    setFileContent: React.PropTypes.func.isRequired
}

export default ContentEditor
