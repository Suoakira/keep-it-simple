import React, { Component } from 'react';
import ExisitingPlansCard from "../components/exisitingplancard"
import { Redirect } from "react-router-dom"
import { Button, Header, Icon, Modal, Loader } from 'semantic-ui-react'

class ExisitingPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: "",
            togglePlan: true
          }
    }

    handleChange = (event) => this.setState({ [event.target.name]: event.target.value })

    toggleButton = () => {
        this.setState({
            togglePlan: !this.state.togglePlan
        })
    }
    
    mapSavingPlans = () => {
        const { localeDelete } = this
        const copySaveTargets = this.state.storedUserDetails.saving_targets
        return copySaveTargets.map(savingTargets => <ExisitingPlansCard savingTargets={savingTargets} localeDelete={localeDelete} />)
    }

    localeDelete = (saving) => {
        let copyUserSts = this.state.storedUserDetails
        const filteredSts = copyUserSts.saving_targets.filter(savingTargets => savingTargets.id !== saving.id )
        copyUserSts.saving_targets = filteredSts
        this.setState({ storedUserDetails: copyUserSts})
    }

    filterPlans = (input) => {
        const filteredPlans = this.state.storedUserDetails.saving_targets.filter(
            plan => plan.name.toLowerCase().includes(input.toLowerCase()))
        let copyUserSts = this.state.storedUserDetails
        copyUserSts.saving_targets = filteredPlans
        this.setState({ storedUserDetails: copyUserSts })
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/users/${this.props.storedUserDetails.id}`)
            .then(resp => resp.json())
            .then(data => this.setState({ storedUserDetails: data }))
    }

    render() { 
        // this.filterPlans(this.state.searchFilter)
        const { toggleButton } = this
        const { username } = this.props
        const { storedUserDetails, togglePlan } = this.state
  
        return ( 
            <React.Fragment>
            
            <div class="ui big icon input search-bar">
                    <input 
                    type="text"
                    name="searchFilter"
                     placeholder="Find a Plan..."
                    onChange={this.handleChange}
                         />
                <i class="search icon"></i>
            </div>
                {togglePlan ?
                <Button
                    primary
                    size="large"
                    onClick={() => toggleButton()}
                >
                    Upcoming Plans
                </Button>
                :
                <Button
                    primary
                    size="large"
                    onClick={() => toggleButton()}
                >
                    Current Plans
                </Button>
                }

            {username?
                <div className="ui grid">

                    {storedUserDetails?

                        this.mapSavingPlans()
                        :
                        <Loader active inline='centered' />
                        }
                </div>
                :
                <div>
                <Redirect
                    to="/login" /> 
                    {alert("PLACEHOLDER MODAL: You must be logged in to visit this page")}
                </div>
            }
            </React.Fragment>

        )
    }
}
 
export default ExisitingPlans



