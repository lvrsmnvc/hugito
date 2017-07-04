import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import ContentListItem from './ContentListItem.jsx';

class ContentList extends Component{
    render(){
        return(
            <ListGroup id='content-list'>{
                this.props.contentElements.map( element =>{
                    const key = element.repositoryName + '_' + element.path + '_' + element.header
                    return <ContentListItem
                        contentElement={element}
                        key={key}
                        {...this.props}
                    />
                })
            }</ListGroup>
        )
    }
}

ContentList.propTypes = {
    contentElements: React.PropTypes.array.isRequired,
    listContent: React.PropTypes.func.isRequired,
    selectedRepository: React.PropTypes.object.isRequired,
    removeContent: React.PropTypes.func.isRequired,
    getFileContent: React.PropTypes.func.isRequired
}

export default ContentList
