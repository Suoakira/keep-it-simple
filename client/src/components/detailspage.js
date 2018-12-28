import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Doughnut } from 'react-chartjs-2';

class ModalExampleDimmer extends Component {
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
            }
        })
        
    }

    render() {
        const { open, close, image, name, category, daysToGo, totalDays, daysSoFar, savingPerDay, leftToSave, savedSoFar } = this.props



        return (
            <div>

                <Modal dimmer="blurring" open={open} onClose={close} centered={false}>
                    <Modal.Header>{name}</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='large' src={image} />
                        <Modal.Description>
                            <Header>{category}</Header>
                            <p>Days till plan complete: {daysToGo}</p>
                            <p>Plan Duration in days{totalDays}</p>
                            <p>Days that have passed: {daysSoFar}</p>
                            <p>Amount saved per day: £{savingPerDay}</p>
                            <p>Total amount left to save: £{leftToSave}</p>
                            <p>Amount you have saved so far:£{savedSoFar}</p>
                            <Doughnut data={this.state.data1} />            
                        </Modal.Description>
                    </Modal.Content>
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

export default ModalExampleDimmer