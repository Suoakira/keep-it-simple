import React, { Component } from 'react';
import ExisitingPlansCard from "../components/ExisitingPlanCard"
import { Redirect, Link } from "react-router-dom"
import { Button, Header, Icon, Modal, Loader, Segment } from 'semantic-ui-react'
import { Pagination } from 'semantic-ui-react'

class ExisitingPlans extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: "",
            togglePlan: true,
            pageUpP: 0,
            pageDownP: 3,
            pageUpG: 0,
            pageDownG: 3
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

    // Pagination code, could be refactored to DRY later
    pagination = (array, pageUp, pageDown) => {
        return array.slice(pageUp, pageDown)  
    }

    pageUpP = () => {
        if ( this.state.pageDownP !== this.mapPersonalPlans().length + 2) {
        this.setState({ pageUpP: this.state.pageUpP + 1, pageDownP: this.state.pageDownP + 1 })
        } 
    }
    pageDownP = () => {
        if (this.state.pageUpP !== 0) {
        this.setState({ pageUpP: this.state.pageUpP - 1, pageDownP: this.state.pageDownP - 1 })
        }
    }
    // refactor sections of code to be one DRY section
    pageUpG = () => {
        if (this.state.pageDownG !== this.mapGroupPlans().length + 2) {
            this.setState({ pageUpG: this.state.pageUpG + 1, pageDownG: this.state.pageDownG + 1 })
        }
    }
    pageDownG = () => {
        if (this.state.pageUpG !== 0) {
            this.setState({ pageUpG: this.state.pageUpG - 1, pageDownG: this.state.pageDownG - 1 })
        }
    }

    totalStateAmount = (array) => {
        let amount = 0
        array.forEach(savingTarget => amount += savingTarget.amount)
        return amount
    }
    

    mapPersonalPlans = () => {
        const { localeDelete } = this
        const copySaveTargets = [...this.state.storedUserDetails.saving_targets]
        const userId = this.state.storedUserDetails.id

        const personalPlan = copySaveTargets.filter(savingTargets => 
            ((savingTargets.plan.toLowerCase() === "personal") 
            && 
            (this.hasStartDatePassed(savingTargets.start_date, savingTargets.end_date)
            &&
            (savingTargets.name.toLowerCase().includes(this.state.searchFilter.toLowerCase()))
            )))
        console.log('this.state.storedUserDetails.saving_targets', this.state.storedUserDetails.saving_targets)
        return personalPlan.map(savingTargets => <ExisitingPlansCard amount={this.totalStateAmount(savingTargets.user_saving_targets)} savingTargets={savingTargets} localeDelete={localeDelete} userId={userId}/>).reverse()
    }

    mapGroupPlans = () => {
        const { localeDelete } = this
        const copySaveTargets = [...this.state.storedUserDetails.saving_targets]
        const userId = this.state.storedUserDetails.id

        const groupPlan = copySaveTargets.filter(savingTargets => 
            ((savingTargets.plan.toLowerCase() === "group") 
            && 
            (this.hasStartDatePassed(savingTargets.start_date, savingTargets.end_date)
            &&
            (savingTargets.name.toLowerCase().includes(this.state.searchFilter.toLowerCase()))
            )))
        
        return groupPlan.map(savingTargets => 
            <ExisitingPlansCard amount={this.totalStateAmount(savingTargets.user_saving_targets)} savingTargets={savingTargets} localeDelete={localeDelete} userId={userId} />).reverse()
    }

    localeDelete = (saving) => {
        let copyUserSts = [...this.state.storedUserDetails.saving_targets]
        const filteredSts = copyUserSts.filter(savingTargets => savingTargets.id !== saving.id )
        copyUserSts.saving_targets = filteredSts
        this.setState({ storedUserDetails: copyUserSts})
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
                                    {this.pagination(this.mapPersonalPlans(), this.state.pageUpP, this.state.pageDownP)}
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
                                <Button onClick={() => this.pageUpP()} compact primary size="tiny" floated='right'>Next<i class="long arrow alternate right icon"></i></Button>
                                <Button onClick={() => this.pageDownP()} compact primary size="tiny" floated='left'><i class="long arrow alternate left icon"></i>Prev</Button>
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
                                    {this.pagination(this.mapGroupPlans(), this.state.pageUpG, this.state.pageDownG)}
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
                                <Button onClick={() => this.pageUpG()} compact primary size="tiny" floated='right'>Next<i class="long arrow alternate right icon"></i></Button>
                                <Button onClick={() => this.pageDownG()} compact primary size="tiny" floated='left'><i class="long arrow alternate left icon"></i>Prev</Button>
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
                <div className="footpad">
                </div>
            </React.Fragment>

                )
            }
        }
         
        export default ExisitingPlans
        
        
        
