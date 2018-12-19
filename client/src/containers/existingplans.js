import React, { Component } from 'react';
import ExisitingPlansCard from "../components/exisitingplancard"

class ExisitingPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storedUserDetails: null

          }
    }

    mapThroughPlans = () => 
    {
        const { storedUserDetails } = this.state
        return storedUserDetails.saving_targets.map(savingTargets => <ExisitingPlansCard savingTargets={savingTargets} /> )
    }


    componentWillMount() {
        this.setState({
            storedUserDetails: this.props.storedUserDetails
        })
    }

    render() { 
        return ( 
            <div>
                <div class="ui link cards">
                    {this.mapThroughPlans()}
                </div>
            </div>
             )
    }
}
 
export default ExisitingPlans;



