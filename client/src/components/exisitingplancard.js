import React, { Component } from 'react';
import API from "../API"

class exisitingPlanCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSavingTargets: undefined
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

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/saving_targets/${this.props.savingTargets.id}`)
            .then(data => data.json())
            .then(savingTs => this.setState({ 
                userSavingTargets: savingTs,
                amount: savingTs.user_saving_targets[0].amount
            }))
    }

    render() { 


        const { userSavingTargets } = this.state
        const { savingTargets } = this.props
        console.log("-------------")
        console.log(savingTargets.name)
        console.log(`days to go ${this.noDaysToGo()}`)
        console.log(`plan total days ${this.totalNoDays()}`)
        console.log(`days expired on plan ${this.noDaysExpired()}`)
        console.log(`amount per day £${this.averageSavingperDay()}`)
        console.log(`Left to save £${this.leftToSave()}`)

        console.log(`amount you have saved so far £${this.hasSavedSofar()}`)

        console.log("-------------")

            return (

                <div class="four wide colum">            
                <div class="ui link cards">
                    <div className="card">
                        <div className="image">
                        <img src={savingTargets.target_image} />
                        </div>
                        <div className="content">
                                {this.state.userSavingTargets ?
                                    <div className="header"> {`${this.noDaysToGo()} days to go to raise £${this.state.userSavingTargets.user_saving_targets[0].amount}`}</div>
                                :
                                <p>loading placeholder</p>
                                }
                                <div className="meta">
                                <a>{savingTargets.category}</a>
                                </div>
                            <div className="description">
                                {savingTargets.name}
                            </div>
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
        
            )
        
         
    }
}
 
export default exisitingPlanCard;