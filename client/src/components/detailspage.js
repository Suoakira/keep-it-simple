import React, { Component } from 'react'
import { Button, Header, Image, Modal, Progress, Statistic, Loader, Segment } from 'semantic-ui-react'
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'rc-progress';

class DetailsModal extends Component {
    state = { 
        usernames: [],
        amounts: [],
        users: undefined
     }

    close = () => this.setState({ open: false })

    getUserName = (id) => {
        const copyUsers = [...this.state.users]
        const user = copyUsers.filter(user => user.id === id)
        return user[0].username
     }

    mapData = () => {
         this.state.userSavingTargets.map(data => this.setState({
             usernames: [...this.state.usernames, this.getUserName(data.user_id)],
             amounts: [...this.state.amounts, data.amount]
         })      
        )
     }

    amountToPercent = () => {
        return this.props.percentSave/100
     }

    // placeholder to simulate number of days
    randomNumber = () => {
        return Math.floor(Math.random() * 60)  
     }

    // placeholder to simulate number of days
    mapProgressBars = () => {
        const copyAmounts = [...this.state.amounts]
        return copyAmounts.map((amount, index) => 
        <Header> {this.state.usernames[index]}
                <Progress percent={Math.round(this.randomNumber() * this.amountToPercent())} size='small' indicating progress />
        </Header> )
     }

    componentWillMount() {
        fetch("http://localhost:3000/api/v1/users")
            .then(data => data.json())
            .then(users => 
                this.setState({
                users: users,
                data1: {
                    labels: [
                        'Days Passed',
                        "Days to Go"
                    ],
                    datasets: [{
                        data: [this.props.daysSoFar, this.props.daysToGo],
                        backgroundColor: [
                            '#f6546a',
                            '#3399ff',

                        ],
                        hoverBackgroundColor: [
                            '#f6546a',
                            '#3399ff',
                        ]
                    }]
                },
                percentToSave: this.props.percentSave,
                userSavingTargets: this.props.userSavingTargets.user_saving_targets
                }, () => this.mapData())
        )
    }
    // https://github.com/jerairrest/react-chartjs-2 for documentation on carting
    render() {
        const { open, close, image, name, category, daysToGo, totalDays, daysSoFar, savingPerDay, leftToSave, savedSoFar } = this.props
        const { percentToSave } = this.state
        return (
            this.state.users && this.state.userSavingTargets ?
                
           
            <div>

           
                <Modal dimmer="blurring" open={open} onClose={close} closeOnDimmerClick={false} centered={false}>
                    <Modal.Header>{name}</Modal.Header>
                    
                    <Modal.Content image>
                        <Header>Deadline Breakdown
                            <Segment>
                                <div className="stats-pad">
                                
                                    <Modal.Description>
                                            
                                        <Statistic.Group>
                                            <Statistic color='red' text-align='center'>
                                                <Statistic.Value>{daysToGo}</Statistic.Value>
                                                <Statistic.Label>Days To Target</Statistic.Label>
                                            </Statistic>
                                        </Statistic.Group>
                                        <Statistic.Group>
                                            
                                            <Statistic color='yellow'>
                                                <Statistic.Value>{daysSoFar}days </Statistic.Value>
                                                <Statistic.Label>Savings Streak</Statistic.Label>
                                            </Statistic>
                                        </Statistic.Group>
                                        <Statistic.Group>
                                            <Statistic color='olive'>
                                                <Statistic.Value>£{savingPerDay}</Statistic.Value>
                                                <Statistic.Label>Saved Per Day</Statistic.Label>
                                            </Statistic>
                                        </Statistic.Group>
                                        <Statistic.Group>

                                            <Statistic color='teal'>
                                                <Statistic.Value>£{savedSoFar}</Statistic.Value>
                                                <Statistic.Label>Total Saved</Statistic.Label>
                                            </Statistic>
                                        </Statistic.Group>
                                    </Modal.Description>
                                
                                </div>
                            </Segment>
                            </Header>
                            <Modal.Description>
                                <Doughnut data={this.state.data1} /> 
                            </Modal.Description>
                    </Modal.Content>
                        {this.mapProgressBars()[1] ?
                            <Header>Group Members Saving Progress
                                <Segment>
                                    {this.mapProgressBars()}
                                </Segment>
                            </Header>
                            :
                            null
                            }
                        {this.props.percentSave?
                        <Header>Overall Progress to Funding Goal
                            <Progress percent={100 - this.props.percentSave} indicating progress />  
                        </Header>   
                        :
                        <Loader>Loading</Loader>
                        }
                        
                    <Modal.Actions>
                        <Button
                            primary
                            icon='checkmark'
                            labelPosition='right'
                            content="Close"
                            onClick={close}
                        />
                    </Modal.Actions>
                    
                </Modal>
            </div>
            :
            <Loader>Loading</Loader>
            
        )
    }
}

export default DetailsModal