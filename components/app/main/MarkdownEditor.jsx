import React, { Component } from 'react';
import Markdown  from 'react-markdown';
import { Label } from 'react-bootstrap';

class MarkdownEditor extends Component {
    onChange(e){
        e.preventDefault();
        const body = e.target.value;
        this.props.contentElement.body = body;
        this.props.setFileContent(this.props.contentElement);
    }
    render() {
        return (
            <div id='markdown-editor'>
                <div className='label-wrapper'>
                    <Label id='markdown-label'>Markdown Editor</Label>
                </div>
                <textarea
                    className='editor'
                    defaultValue=''
                    value={this.props.contentElement.body}
                    onChange={this.onChange.bind(this)}
                />
                <div id='split-line'></div>
                <div id='right-label-wrapper' className='label-wrapper'>
                    <Label id='preview-label'>Content Preview</Label>
                </div>
                <Markdown
                    className='preview pre-scrollable'
                    source={this.props.contentElement.body}
                    escapeHtml
                />
            </div>
        )
    }
}


MarkdownEditor.propTypes = {
    contentElement: React.PropTypes.object.isRequired,
    setFileContent: React.PropTypes.func.isRequired
}

export default MarkdownEditor
