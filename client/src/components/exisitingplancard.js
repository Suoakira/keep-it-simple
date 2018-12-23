import React, { Component } from 'react';
import API from "../API"

class exisitingPlanCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSavingTargets: undefined
         }
    }

    formatDate = () => {
        const oneDay = 24 * 60 * 60 * 1000
        const date1 = new Date(Date.now())
        const date2 = new Date(this.props.savingTargets.end_date)
        const daysToGo = Math.round(Math.abs((date2.getTime() - date1.getTime()) / (oneDay)))
        if (daysToGo > 0) {
            return Math.round(Math.abs((date2.getTime() - date1.getTime()) / (oneDay)))
        } else {
            return "This plan has expired!"
        }
    }

    convertDateToString = () => 
         new Date(Date.parse(this.props.savingTargets.start_date)).toDateString()

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/saving_targets/${this.props.savingTargets.id}`)
            .then(data => data.json())
            .then(savingTs => this.setState({ userSavingTargets: savingTs }))
    }

    render() { 
        const { userSavingTargets } = this.state
        const { savingTargets } = this.props
            return (

                <div class="four wide colum">            
                <div class="ui link cards">
                    <div className="card">
                        <div className="image">
                        <img src={savingTargets.target_image} />
                        </div>
                        <div className="content">
                                {this.state.userSavingTargets ?
                                    <div className="header"> {`${this.formatDate()} days to go to raise £${this.state.userSavingTargets.user_saving_targets[0].amount}`}</div>
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