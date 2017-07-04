import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class ContentListItem extends Component{
    onClick(e){
        let {contentElement, listContent, selectedRepository} = this.props;
        e.preventDefault();
        if (this.checkString(e.target.getAttribute('class'), 'list-group-item')){
            let extension = contentElement.header.split(".").pop()
            if(extension === "md") {
                this.editContentFile();
            }
            else {
                listContent(selectedRepository, contentElement.path + "/" + contentElement.header)
            }
        } else {
            this.props.removeContent(this.props.contentElement);
        }
    }
    checkString(mainString, subString){
        var result = mainString.indexOf(subString) > -1;
        return result;
    }
    editContentFile(){
        let {getFileContent, contentElement} = this.props;
        getFileContent(contentElement.header, contentElement.path);
    }
    render(){
        let {contentElement} = this.props;
        // Check if the file is markdown.
        let info = contentElement.header.split('.').pop() === 'md' ? 'Written by ' + contentElement.author + ' in ' + contentElement.date : 'Folder';
        return(
            <div id='list-item'>
                <ListGroupItem onClick={this.onClick.bind(this)} header={this.props.contentElement.header}>{info}</ListGroupItem>
                <Button onClick={this.onClick.bind(this)} bsSize='small' id='list-button'><Glyphicon glyph='trash' /></Button>
            </div>
        )
    }
}

ContentListItem.propTypes = {
    contentElement: React.PropTypes.object.isRequired,
    listContent: React.PropTypes.func.isRequired,
    selectedRepository: React.PropTypes.object.isRequired,
    removeContent: React.PropTypes.func.isRequired,
    getFileContent: React.PropTypes.func.isRequired
}

export default ContentListItem
