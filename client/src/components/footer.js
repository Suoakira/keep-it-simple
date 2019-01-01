import React, { Component } from 'react';
import { Button } from "semantic-ui-react"

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="ui inverted vertical footer segment" id="pad-footer">
                <div className="ui center aligned container">
                    <h4 className="ui inverted header">&copy; Copyright 2018 | All rights reserved | KeepItSimple</h4>
                    <a href="https://www.facebook.com/"><Button large circular color='facebook' icon='facebook' /></a>
                    <a href="https://twitter.com/"><Button large circular color='twitter' icon='twitter' /></a>
                    <a href="https://plus.google.com/discover"><Button large circular color='google plus' icon='google plus' /></a>
                </div>
            </div>


        )
    }
}
 
export default Footer;