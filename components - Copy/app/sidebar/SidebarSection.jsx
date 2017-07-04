import React, {Component} from 'react';
import MenuList from './MenuList.jsx';
import RepositorySection from './RepositorySection.jsx';

class SidebarSection extends Component{
    render(){
        return(
            <div id='sidebar'>
                <RepositorySection {...this.props}/>
                { this.props.repositoryIsValid === 'true' ? <MenuList {...this.props} /> : null }
                <img id='sidebar-logo' src='../../images/logo-horizontal.png'></img>
            </div>
        )
    }
}

SidebarSection.propTypes = {
    setActiveMenuItem: React.PropTypes.func.isRequired,
    activeMenuItem: React.PropTypes.string.isRequired,
    setActiveMenuItem: React.PropTypes.func.isRequired,
    treeMenu: React.PropTypes.array.isRequired,
    repositoryIsValid: React.PropTypes.string.isRequired,
    setModal: React.PropTypes.func.isRequired
}

export default SidebarSection
