import React, { Component } from 'react';
import { Button, List, Progress, Loader, Statistic } from 'semantic-ui-react'
import API from "../API"
import DetailsModal from "../components/detailspage"
import DeleteModal from "../components/deletemodal"
import MapComments from "../containers/mapcomments"

class exisitingPlanCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSavingTargets: undefined,
            open: false,
            openDelete: false,
            openComment: false,
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
            const percent = (this.leftToSave() / this.totalAmount()) * 100
            return Math.round(percent)
        }
    }

    totalAmount = () => {
        let amount = 0
        this.state.userSavingTargets.user_saving_targets.forEach(savingTarget => amount += savingTarget.amount)
        return amount
    }

    totalStateAmount = (array) => {
        let amount = 0
        array.forEach(savingTarget => amount += savingTarget.amount)
        return amount
    }

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

    // comment modal open close
    showComment = () => this.setState({ openComment: true })
    closeComment = () => this.setState({ openComment: false })

    componentWillMount() {
        fetch(`http://localhost:3000/api/v1/saving_targets/${this.props.savingTargets.id}`)
            .then(data => data.json())
            .then(savingTs => this.setState({ 
                userSavingTargets: savingTs,
                amount: this.totalStateAmount(savingTs.user_saving_targets)
            }))
    }

    render() { 
        
        const { open, openDelete, userSavingTargets, openComment } = this.state
        const { close, closeDelete, closeAndDelete, showComment, closeComment } = this
        const { savingTargets, userId } = this.props
            return (

            this.state.userSavingTargets ?
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
                                            <List.Icon className="coloricons" name='calendar' />
                                            <List.Content><b>{this.noDaysToGo()}</b> Days to Deadline</List.Content>                                  
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon className="coloricons"  name='lock' />
                                                    <List.Content><b>{this.percentToSave()}</b> saved per day</List.Content>
                                        </List.Item>
                                        <List.Item>
                                                    <List.Icon className="coloricons" name='pound sign' />
                                                    <List.Content><b>{this.hasSavedSofar()}</b>/<b>{this.totalAmount()}</b> Raised</List.Content>
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
                                    Stats
                                </Button>
                                
                                <Button
                                    primary
                                    size="small"
                                    onClick={() => showComment() }
                                >
                                <i class="comment icon"></i>
                                {(savingTargets.plan == "group") ?
                                "Comments"
                                :
                                "Notes"
                                }
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
                                    userSavingTargets={this.state.userSavingTargets}
                                />
                                <MapComments
                                    open={openComment}
                                    savingTargets={savingTargets}
                                    close={closeComment}
                                    userSavingTargets={this.state.userSavingTargets}
                                    savingTargetId={savingTargets.id}
                                    userId={userId}
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

            <Loader>Loading</Loader>
            

            )
        
         
    }
}
 
export default exisitingPlanCard;