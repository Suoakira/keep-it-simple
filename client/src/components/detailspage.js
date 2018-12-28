import React, { Component } from 'react'
import { Button, Header, Image, Modal, Progress, Statistic, Loader } from 'semantic-ui-react'
import { Doughnut } from 'react-chartjs-2';

class DetailsModal extends Component {
    state = { 
        
     }


    close = () => this.setState({ open: false })

    componentDidMount() {
        this.setState({
            data1: {
                labels: [
                    'Days Passed',
                    "Days to Go" 
                ],
                datasets: [{
                    data: [this.props.daysSoFar, this.props.daysToGo],
                    backgroundColor: [
                        '#FF6384',
                        '#FFCE56',
                        
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#FFCE56',    
                    ]
                }]
            },
            percentToSave: this.props.percentSave
        })
        
    }
    // https://github.com/jerairrest/react-chartjs-2 for documentation on carting
    render() {
        const { open, close, image, name, category, daysToGo, totalDays, daysSoFar, savingPerDay, leftToSave, savedSoFar } = this.props
        const { percentToSave } = this.state



        return (
            <div>
                <Modal dimmer="blurring" open={open} onClose={close} closeOnDimmerClick={false} centered={false}>
                    <Modal.Header>{name}</Modal.Header>
                    <Modal.Content image>
                
                        <Modal.Description>
                            <Header>Deadline Breakdown</Header>
                            <Statistic.Group>
                                <Statistic color='red'>
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

                                <Statistic color='teal'>
                                    <Statistic.Value>£{savedSoFar}</Statistic.Value>
                                    <Statistic.Label>Total Saved</Statistic.Label>
                                </Statistic>

                            </Statistic.Group>
                        </Modal.Description>
                        <Modal.Description>
                
                            <Doughnut data={this.state.data1} /> 
                       
                        </Modal.Description>
                        
                    </Modal.Content>
                        {this.props.percentSave?
                        <Header>To Funding Goal
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
        )
    }
}

export default DetailsModal