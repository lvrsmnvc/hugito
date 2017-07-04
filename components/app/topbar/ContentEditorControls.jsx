import React, { Component }from 'react';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

class ContentEditorControls extends Component{
    onClick(e){
        e.preventDefault();
        if (e.target.id === "") {
            this.props.setShowContentEditor('false');
            this.props.setShowContent('true');
        } else if (e.target.id === "content-publish") {
            // Publish website
            let {publishContent} = this.props;
            publishContent();
        } else if (e.target.id === "content-save") {
            // Save the website but doesn't publish
            let {saveContent} = this.props
            saveContent()
        }
    }
    render(){
        return (
            <ul id='content-editor-controls'>
                <li><Button id="content-back" bsSize='small' className='btn' onClick={this.onClick.bind(this)}><Glyphicon glyph='arrow-left'/></Button></li>
                <li><h5>{this.props.fileName}</h5></li>
                <li><Button id="content-save" bsSize='small' className='btn' onClick={this.onClick.bind(this)}><Glyphicon glyph='floppy-disk'/> Save</Button></li>
                <li><Button id="content-publish" bsSize='small' className='btn' onClick={this.onClick.bind(this)}><Glyphicon glyph='arrow-up'/> Publish</Button></li>
            </ul>
        )
    }
}

ContentEditorControls.propTypes = {
    fileName: React.PropTypes.string.isRequired,
    setShowContent: React.PropTypes.func.isRequired,
    setShowContentEditor: React.PropTypes.func.isRequired,
    publishContent: React.PropTypes.func.isRequired,
    saveContent: React.PropTypes.func.isRequired
}

export default ContentEditorControls
