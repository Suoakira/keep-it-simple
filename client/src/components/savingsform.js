import React, { Component } from 'react'
import { Button, Divider, Grid, Header, Icon, Search, Segment, Select, Form } from 'semantic-ui-react'

import API from "../API"
import { Redirect } from "react-router-dom"


import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';

class SavingsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
                name: undefined,
                start_date: undefined,
                end_date: undefined,
                category: undefined,
                target_image: undefined,
                plan: undefined,
                user_id: undefined,
                datesRange: '',
                amount: undefined,
                user_id: undefined,
                propSavingTargets: undefined
            }
        }

    splitDate = (date) => {
        return date.split(" - ")
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = (event) => {
        event.preventDefault()
        let SavingTargetId = undefined
        const { name, category, target_image, plan, datesRange, user_id, amount } = this.state
        const SavingTarget = {
            name: name,
            start_date: this.splitDate(datesRange)[0],
            end_date: this.splitDate(datesRange)[1],
            category: category,
            target_image: target_image,
            plan: plan
        }
        API.postSavingsTarget(SavingTarget)
            .then(resp => {
                SavingTargetId = resp.id
            })
            .then(() => API.postUserSavingsTarget(
                {
                user_id: user_id,
                saving_target_id: SavingTargetId,
                amount: amount
                }
            ))     
    }
    // make post user_saving_targets(user, saving_target, amount) ????

    componentDidMount() {
        this.setState({
            storedUserDetails: this.props.storedUserDetails,
            user_id: this.props.storedUserDetails.id
        })
    }

    render() { 
        const { name, category, target_image, amount, plan } = this.state
        const planOptions = [
            { key: 'p', text: 'Personal', value: 'Personal' },
            { key: 'g', text: 'Group', value: 'Group' },
        ]

        return (
            <div className="wrapper">
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='center'>
                    
                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column>
                                <Header>Create Savings Plan</Header>
                                    <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Input label="Plan Name"placeholder='Name' name='name' value={name} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group>
                                    
                                    <Form.Field
                            
                                        control={Select}
                                        options={planOptions}
                                        label={{ children: 'Plan type?', htmlFor: 'form-select-control-gender' }}
                                        placeholder='Plan'
                                        search
                                        name="plan"
                                        value={plan}
                                        onChange={this.handleChange}
                                        searchInput={{ id: 'form-select-control-gender' }}
                                    />
                                </Form.Group>

                                <Form.Group>
                                <Form.Input label="Category" placeholder='Category' name='category' value={category} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group>
                                <Form.Input label="Image Url" placeholder='Image' name='target_image' value={target_image} onChange={this.handleChange}  />
                                </Form.Group>

                                <Form.Group>
                                <Form.Input label="Amount to save" placeholder='Amount' name='amount' value={amount} onChange={this.handleChange} />
                                </Form.Group>
                                
                                <Form.Group>
                                    <DatesRangeInput
                                        label="Plan Start/End dates"
                                        name="datesRange"
                                        placeholder="From - To"
                                        value={this.state.datesRange}
                                        iconPosition="left"
                                        onChange={this.handleChange} />
                                    
                                </Form.Group>
                                    <div class="ui medium primary button" onClick={(event) => this.handleSubmit(event)}>Create Plan <i class="right arrow icon"></i></div>
                            </Form>
                            </Grid.Column>
                            <Grid.Column>
                                

                                    
                                    <div>
                                    <img src="https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/2014090/1360/2035/m1/fpnw/wm1/qdrpofpduuwwhs9zz7ayfuobitf8xwo42xcvdclixbrxaa4iabpct82rvc5zxrlf-.jpg?1481494830&s=dca5b92f8fe1937750c7cd78d4777c1d" id="savings-image1" alt="plant growing out of hand" />
                                    </div>
             
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
            </Segment>
            </div>


 


         )
    }
}
 
export default SavingsForm