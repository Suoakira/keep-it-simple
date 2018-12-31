import React, { Component } from 'react';
import ExisitingPlansCard from "../components/exisitingplancard"
import { Redirect, Link } from "react-router-dom"
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
    hasStartDatePassed = (startDate, endDate) => {
        if ((Date.now() > new Date(startDate).valueOf()) && (Date.now() < new Date(endDate).valueOf())) {
            return true
        } else {
            return false
        }
    }
    
    mapPersonalPlans = () => {
        const { localeDelete } = this
        const copySaveTargets = [...this.state.storedUserDetails.saving_targets]
        const userId = this.state.storedUserDetails.id
        const personalPlan = copySaveTargets.filter(savingTargets => savingTargets.plan.toLowerCase() === "personal")

        // clean up this code
        const filters = personalPlan.filter(savingTargets => this.hasStartDatePassed(savingTargets.start_date, savingTargets.end_date))
        return filters.map(savingTargets => <ExisitingPlansCard savingTargets={savingTargets} localeDelete={localeDelete} userId={userId}/>)
    }

    mapGroupPlans = () => {
        const { localeDelete } = this
        const copySaveTargets = [...this.state.storedUserDetails.saving_targets]
        const userId = this.state.storedUserDetails.id
        const groupPlan = copySaveTargets.filter(savingTargets => savingTargets.plan.toLowerCase() === "group")

        // clean up this code
        const filters = groupPlan.filter(savingTargets => this.hasStartDatePassed(savingTargets.start_date, savingTargets.end_date) )
        return filters.map(savingTargets => 
        <ExisitingPlansCard savingTargets={savingTargets} localeDelete={localeDelete} userId={userId} />)
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
                                {!!this.mapPersonalPlans()[0] ?
                                
                                
                                <React.Fragment>
                                <div className="ui grid container">
                                    {this.mapPersonalPlans()}
                                </div>                          

                                </React.Fragment>
                                :
                                <div className="no-plans">
                                    <Header>You have no personal saving plans</Header>
                                        <Link to="/home/newplan"><button class="ui primary button">
                                            Create A Plan<i class="arrow right icon"></i></button>
                                        </Link>
                                </div>
                                }
                        </Segment>
                                    <div className="pagination">
                                        <Button compact primary size="tiny" floated='right'>Next<i class="long arrow alternate right icon"></i></Button>
                                        <Button compact primary size="tiny" floated='left'><i class="long arrow alternate left icon"></i>Prev</Button>
                                    </div>  
                        <Segment>
                            <Segment>
                                <Header size='large'>Group Plans
                                    <Header.Subheader>A collection your of group saving goals.</Header.Subheader>
                                </Header>
                            </Segment>
                            {!!this.mapGroupPlans()[0] ?
                            <React.Fragment>
                                <div className="ui grid container">
                                        {this.mapGroupPlans()}
                                </div>
                            </React.Fragment>
                            :
                            <div className="no-plans">
                                <Header>You have no group saving plans</Header>
                                <Link to="/home/newplan"><button class="ui primary button">
                                    Create A Plan<i class="arrow right icon"></i></button>
                                </Link>
                            </div>
                            }
                        </Segment>
                                    <div className="pagination">
                                        <Button compact primary size="tiny" floated='right'>Next<i class="long arrow alternate right icon"></i></Button>
                                        <Button compact primary size="tiny" floated='left'><i class="long arrow alternate left icon"></i>Prev</Button>
                                    </div> 
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
        
        
        
