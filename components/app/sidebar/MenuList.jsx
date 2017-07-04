import React, { Component } from 'react';
import { SideNav } from 'react-sidenav';

class MenuTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        }
    }
    onSelection(selection) {
        let {setActiveMenuItem} = this.props;
        setActiveMenuItem(selection.id);
        this.setState({selected: selection.id});
    }
    render() {
        let {selected} = this.state;
        let {treeMenu, branch} = this.props;
        return (
            <div className='menu-list'>
                <SideNav
                    selected={selected}
                    navs={treeMenu}
                    onSelection={this.onSelection.bind(this)}/>
            </div>
        )
    }
}

MenuTree.propTypes = {
    setActiveMenuItem: React.PropTypes.func.isRequired,
    activeMenuItem: React.PropTypes.string.isRequired,
    treeMenu: React.PropTypes.array.isRequired
}

export default MenuTree
