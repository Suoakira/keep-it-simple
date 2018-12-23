import React, { Component } from 'react';
import ExisitingPlansCard from "../components/exisitingplancard"

class ExisitingPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: ""
          }
    }

    mapSavingPlans = () => {
        const copySaveTargets = this.state.storedUserDetails.saving_targets
        return copySaveTargets.map(savingTargets => <ExisitingPlansCard savingTargets={savingTargets} />)
    }

    filterPlans = (input) => {
        const copySaveTargets = [...this.state.storedUserDetails.savingTargets]
        copySaveTargets.filter(savingTargets => savingTargets.name.includes(input))
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



