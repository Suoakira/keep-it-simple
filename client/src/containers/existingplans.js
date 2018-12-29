import React, { Component } from 'react';
import ExisitingPlansCard from "../components/exisitingplancard"
import { Redirect } from "react-router-dom"
import { Button, Header, Icon, Modal, Loader, Segment } from 'semantic-ui-react'
import { Pagination } from 'semantic-ui-react'

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
        this.filterStartDate()
    }

    //future plans
    filterStartDate = () => {
        const copySaveTargets = [...this.state.storedUserDetails.saving_targets]
        const filters = copySaveTargets.filter(savingTargets => Date.now() < new Date(savingTargets.start_date).getTime())
        console.log(filters)
    }
    
    mapPersonalPlans = () => {
        const { localeDelete } = this
        const copySaveTargets = [...this.state.storedUserDetails.saving_targets]
        const personalPlan = copySaveTargets.filter(savingTargets => savingTargets.plan.toLowerCase() === "personal")
        return personalPlan.map(savingTargets => <ExisitingPlansCard savingTargets={savingTargets} localeDelete={localeDelete} />)
    }

    mapGroupPlans = () => {
        const { localeDelete } = this
        const copySaveTargets = [...this.state.storedUserDetails.saving_targets]
        const groupPlan = copySaveTargets.filter(savingTargets => savingTargets.plan.toLowerCase() === "group")
        return groupPlan.map(savingTargets => <ExisitingPlansCard savingTargets={savingTargets} localeDelete={localeDelete} />)
    }

    localeDelete = (saving) => {
        let copyUserSts = [...this.state.storedUserDetails.saving_targets]
        const filteredSts = copyUserSts.filter(savingTargets => savingTargets.id !== saving.id )
        copyUserSts.saving_targets = filteredSts
        this.setState({ storedUserDetails: copyUserSts})
    }

    // filterPlans = (input) => {
    //     const filteredPlans = this.state.storedUserDetails.saving_targets.filter(
    //         plan => plan.name.toLowerCase().includes(input.toLowerCase()))
    //     let copyUserSts = this.state.storedUserDetails
    //     copyUserSts.saving_targets = filteredPlans
    //     this.setState({ storedUserDetails: copyUserSts })
    // }

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
                <div className="wrapper">
                    <div className="button-pad">
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
                    </div>
            {username?
                <React.Fragment>
                    {storedUserDetails?
                    <React.Fragment>
                        <Segment>
                            <Segment>
                                <Header size='large'>Personal Plans
                                    <Header.Subheader>A collection of your personal saving goals.</Header.Subheader>
                                </Header>
                            </Segment>
                                <div className="ui grid container">
                                    {this.mapPersonalPlans()}
                                </div>
                        </Segment>
                        <Segment>
                            <Segment>
                                <Header size='large'>Group Plans
                                    <Header.Subheader>A collection of your group saving goals.</Header.Subheader>
                                </Header>
                            </Segment>
                            <div className="ui grid container">
                                    {this.mapGroupPlans()}
                            </div>
                        </Segment>
                    </React.Fragment>
                            :
                        <Loader active inline='centered' />
                        }
                </React.Fragment>
                
                :
                <React.Fragment>
                <Redirect
                    to="/login" /> 
                </React.Fragment>
                }

                </div>
            </React.Fragment>
        
        
                )
            }
        }
         
        export default ExisitingPlans
        
        
        
