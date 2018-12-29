import React, { Component } from 'react';
import { Button, List, Progress, Loader } from 'semantic-ui-react'
import API from "../API"
import DetailsModal from "../components/detailspage"
import DeleteModal from "../components/deletemodal"

class exisitingPlanCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSavingTargets: undefined,
            open: false,
            openDelete: false, 
            percent: 0
         }
    }

    noDaysBetween = (date1, date2) => {
        const oneDay = 24 * 60 * 60 * 1000
        const daysToGo = Math.round(Math.abs((date2.getTime() - date1.getTime()) / (oneDay)))
        return daysToGo
    }

    leftToSave = () => {
        return (this.noDaysToGo() * this.averageSavingperDay())       
    }

    hasSavedSofar = () => {
        return (this.noDaysExpired() * this.averageSavingperDay())   
    }

    averageSavingperDay = (amount) => {
        return Math.round(this.state.amount/this.totalNoDays())    
    }

    noDaysExpired = () => {
        const startDate = new Date(this.props.savingTargets.start_date)
        const currentDate = new Date(Date.now())
        return this.noDaysBetween(startDate, currentDate)

    }

    totalNoDays = () => {
        const startDate = new Date (this.props.savingTargets.start_date)
        const endDate = new Date (this.props.savingTargets.end_date)
        return this.noDaysBetween(startDate, endDate)
    }

    hasStartDatePassed = (date) => {
        if (Date.now() > new Date(date).valueOf()) {
            return true
        } else {
            return false
        }
    }

    noDaysToGo = () => {
        const currentDate = new Date(Date.now())
        const endDate = new Date(this.props.savingTargets.end_date)
        const daysToGo = this.noDaysBetween(currentDate, endDate)
        if (daysToGo > 0) {
            return daysToGo
        } else {
            return 0
        }   
    }

    convertDateToString = () => 
         new Date(Date.parse(this.props.savingTargets.start_date)).toDateString()

    
    deletePlan = () => {
        API.deleteSavingTarget(this.props.savingTargets)
        this.props.localeDelete(this.props.savingTargets)
    }

    percentToSave = () => {
        if (this.state.userSavingTargets) {
            const percent= (this.leftToSave()/this.state.userSavingTargets.user_saving_targets[0].amount) * 100
            return Math.round(percent)
        }

    }

    mapThroughUserSavingTargets = () =>
        this.state.userSavingTargets.user_saving_targets.map(save => console.log(save))

    // more info button modal operation
    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    // delete modal open close
    showDelete = () => this.setState({ openDelete: true })
    closeDelete = () => this.setState({ openDelete: false })
    closeAndDelete = () => {
        this.deletePlan()
        this.setState({ openDelete: false })
    }

    

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/saving_targets/${this.props.savingTargets.id}`)
            .then(data => data.json())
            .then(savingTs => this.setState({ 
                userSavingTargets: savingTs,
                amount: savingTs.user_saving_targets[0].amount
            }))
    }

    render() { 

        const { open, openDelete, userSavingTargets } = this.state
        const { close, closeDelete, closeAndDelete } = this
        const { savingTargets } = this.props


            return (
            this.hasStartDatePassed(this.props.savingTargets.start_date) ?

            <div className="four wide ">  
                <div className="ui link cards">
                    <div className="card" id="cardpad">
                        <div className="image">
                        <img src={savingTargets.target_image} />
                        </div>
                        <div className="content">
                            <div className="header">
                                <a>{savingTargets.category}</a>
                             </div>
                            <div className="description">
                                {savingTargets.name}
                            </div>
                        </div>
                        <React.Fragment>
                            {this.state.userSavingTargets ?
                                <div className="extra content">
                                    <List>
                                        <List.Item>
                                            <List.Icon name='calendar' />
                                            <List.Content>{this.noDaysToGo()} Days to Deadline</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='lock' />
                                            <List.Content>{this.hasSavedSofar()}</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name='pound sign' />
                                                <List.Content>{(this.state.userSavingTargets.user_saving_targets[0].amount - this.leftToSave())}/{this.state.userSavingTargets.user_saving_targets[0].amount} Raised</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <Progress percent={100 - this.percentToSave()} indicating progress />
                                            </List.Content>
                                        </List.Item>      
                                    </List>
                                </div>
                                    :
                                    <Loader active inline='centered' />
                   
                            }
                            </React.Fragment>
                            <div className="extra content">
                            <span className="right floated">
                                <Button
                                    negative
                                    size="small"
                                    onClick={() => this.showDelete()}
                                >
                                    X
                                </Button>
                                <Button
                                    primary
                                    size="small"
                                    onClick={() => this.open() }
                                >
                                    More Info
                                </Button>
                                <DeleteModal
                                name={savingTargets.name}
                                openDelete={openDelete}
                                closeDelete={closeDelete}
                                closeAndDelete={closeAndDelete}
                                        />
                                <DetailsModal 
                                open={open} 
                                close={close}
                                image={savingTargets.target_image}
                                name={savingTargets.name}
                                category={savingTargets.category}
                                daysToGo={this.noDaysToGo()}
                                totalDays={this.totalNoDays()}
                                daysSoFar={this.noDaysExpired()}
                                savingPerDay={this.averageSavingperDay()}
                                leftToSave={this.leftToSave()}
                                savedSoFar={this.hasSavedSofar()}
                                percentSave={this.percentToSave()}
                                />
                            </span>
                            </div>
                            <div className="extra content">
                                <span className="right floated">
                            Plan Launched {this.convertDateToString()}
                            </span>
                            <span>
                                    
                                {/* {savingTargets.end_date} */}
                            </span>
                            </div>

                    </div>
                </div>
            </div>
 
            :
            null
        
            )
        
         
    }
}
 
export default exisitingPlanCard;