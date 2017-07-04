import React, { Component } from 'react';

class Welcome extends Component {
    render(){
        return(
            <div id='welcome'>
                <div className='centered-text'>
                    <h1>Welcome to Hugito :)</h1>
                    <br/>
                    <h4><b>1.</b> Create a github repository for your webpage</h4>
                    <h4><b>2.</b> Choose a branch to hold your Hugo project</h4>
                    <h4><b>3.</b> Choose a branch to hold the public content</h4>
                    <h4><b>4.</b> Edit your content and let the magic happen!</h4>
                </div>
            </div>
        )
    }
}

export default Welcome
