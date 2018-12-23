import React, { Component } from 'react';
import ExisitingPlansCard from "../components/exisitingplancard"

class ExisitingPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSavingTarget: this.props.newSavingTarget
          }
    }

    mapSavingPlans = () => {
        const copyArray = this.state.storedUserDetails.saving_targets
        return copyArray.map(savingTargets => <ExisitingPlansCard savingTargets={savingTargets} />)
    }

    componentWillMount() {
        fetch(`http://localhost:3000/api/v1/users/${this.props.storedUserDetails.id}`)
            .then(resp => resp.json())
            .then(data => this.setState({ storedUserDetails: data }))
    }

    render() { 
        
        const { storedUserDetails } = this.state
  
        return ( 
                <div className="ui grid">
                {storedUserDetails?
                    this.mapSavingPlans()
                    :
                    <p>loading</p>
                    }
                </div>
        )
    }
}
 
export default ExisitingPlans



