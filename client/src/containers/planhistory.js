import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import { Table, Loader, Segment, Header } from 'semantic-ui-react'
import HistoryRow from "../components/HistoryRow"

class PlanHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    
    unixTime = (date) => (new Date(date).getTime())

    filterStart = (plans) => plans.filter(plan => Date.now() < this.unixTime(plan.start_date) )
    filterEnd = (plans) => plans.filter(plan => Date.now() > this.unixTime(plan.end_date))


    noDaysBetween = (date1, date2) => {
        const oneDay = 24 * 60 * 60 * 1000
        const daysToGo = Math.round(Math.abs((date2.getTime() - date1.getTime()) / (oneDay)))
        return daysToGo
    }

    sortByDate = (plans) => {
        plans.sort((a, b) => {
            return new Date(a.start_date) - new Date(b.start_date);
        });
    }

    getAmount = (targets) => {
        let amount = 0
        if (!!targets.user_saving_targets[1]) {
            targets.user_saving_targets.forEach(target => amount += target.amount)
        } else {
            amount = targets.user_saving_targets[0].amount
        }
        return amount
    }

    mapStartRows = () => {
        const copyTargets = [...this.state.savingTargets]
        this.sortByDate(copyTargets)
        return this.filterStart(copyTargets).map(target => <HistoryRow name={target.name} category={target.category} amount={this.getAmount(target)} daysToGo={`(${this.noDaysBetween(new Date(Date.now()), new Date(target.start_date))} days to start)`} startDate={target.start_date} /> )
    }
    mapEndRows = () => {
        const copyTargets = [...this.state.savingTargets]
        this.sortByDate(copyTargets)
        return this.filterEnd(copyTargets).map(target => <HistoryRow name={target.name} category={target.category} amount={this.getAmount(target)} daysToGo={`(${this.noDaysBetween(new Date(Date.now()), new Date(target.start_date))} days ago)`} startDate={target.start_date} />)
    }


    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/users/${this.props.userId}`)
            .then(resp => resp.json())
            .then(data => this.setState({ 
                storedUserDetails: data,
                savingTargets: data.saving_targets
             })
        )
    }
    
    render() {
        const { username } = this.props
        return (
            username ?
                <div className="wrapper">
                    <Segment>
                    <Segment>
                        <Header size='large'>Upcoming Plans
                            <Header.Subheader>A collection of your upcoming saving goals.</Header.Subheader>
                        </Header>
                    </Segment>
                    
                   <Segment>
                    <Table celled inverted selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Start Date</Table.HeaderCell>
                                <Table.HeaderCell>Plan Name</Table.HeaderCell>
                                <Table.HeaderCell>Category</Table.HeaderCell>
                                <Table.HeaderCell>Saving Goal (£)</Table.HeaderCell>
                                
                            </Table.Row>
                        </Table.Header>
                        
                            <Table.Body>
                                {this.state.savingTargets ?
                                    
                                        this.mapStartRows()
                                    
                                        :
                                        null
                                }
                            
                            </Table.Body>
                     
                    </Table>
                    </Segment>
                    </Segment>

                    <Segment>
                        <Segment>
                            <Header size='large'>Expired Plans
                            <Header.Subheader>A collection of your past saving goals.</Header.Subheader>
                            </Header>
                        </Segment>

                    <Segment>
                    <Table celled inverted selectable>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Compleated On</Table.HeaderCell>
                            <Table.HeaderCell>Plan Name</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Amount Raised (£)</Table.HeaderCell>
                            
                        </Table.Row>
                        </Table.Header>

                    <Table.Body>
                        {this.state.savingTargets ?
                            this.mapEndRows().reverse()
                            :
                            null
                        }

                    </Table.Body>
                    </Table>
                            </Segment>
                    </Segment>
                    <div className="historypad"></div>
                </div>
                :
                <div>
                    <Redirect
                        to="/login" />
                </div>

        )
    }
}

export default PlanHistory;