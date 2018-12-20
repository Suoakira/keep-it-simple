import React, { Component } from 'react';
import ExisitingPlansCard from "../components/exisitingplancard"

class ExisitingPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storedUserDetails: null

          }
    }
    
    mapSavingPlans = () => 
        this.props.storedUserDetails.saving_targets.map(savingTargets => <ExisitingPlansCard savingTargets={savingTargets} />)

    componentWillMount() {
        this.setState({
            storedUserDetails: this.props.storedUserDetails
        })
    }

    render() { 
        const { storedUserDetails } = this.state
        this.mapSavingPlans()
        
        return ( 

                <div class="ui grid">
                    {this.mapSavingPlans()}
                </div>
    
             )
    }
}
 
export default ExisitingPlans;



