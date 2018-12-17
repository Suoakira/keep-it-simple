import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (    
                <div class="ui inverted menu">
                    <div class="header item">Brand</div>
                        <div class="active item">Link</div>
                        <a class="item">Link</a>
                            <div class="ui dropdown item" tabindex="0">
                             Dropdown
                            <i class="dropdown icon"></i>
                            <div class="menu" tabindex="-1">
                            <div class="item">Action</div>
                            <div class="item">Another Action</div>
                            <div class="item">Something else here</div>
                            <div class="divider"></div>
                            <div class="item">Separated Link</div>
                            <div class="divider"></div>
                            <div class="item">One more separated link</div>
                        </div>
                     </div>
                    <div class="right menu">
                        <div class="item">
                            <div class="ui transparent inverted icon input">
                                <i class="search icon"></i>
                                <input type="text" placeholder="Search" />
                            </div>
                        </div>
                        <a class="item active">Link</a>
                    </div>
                </div> 
                )
    }
}
 
export default Navbar;