import React, { Component } from 'react';

class SavingsCards extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { data } = this.props
        return ( 
       
                <li>
                    <a className="rig-cell" href="#">
                        <img className="rig-img" src={data.imageUrl} alt="savings-image" />
                        <span className="rig-overlay"></span>
                        <span className="rig-text">{data.title}</span>
                    </a>
                </li>


     
         )
    }
}
 
export default SavingsCards