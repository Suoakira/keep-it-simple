import React, { Component } from 'react'
import {   Grid, Header, Segment, Select, Form, Message } from 'semantic-ui-react'

import API from "../API"
import { Redirect } from "react-router-dom"


import {
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
                propSavingTargets: undefined,
                errorST: "",
                errorUST: "",
                submit: false, 
                arrayOfUTS: []
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
                if (resp.error){
                    console.log(resp.error)
                    this.setState({ errorST: resp.error })
                    this.setState({error: resp.error})
                } else {
                SavingTargetId = resp.id
                console.log(resp)
                }
            })
            .then(() => API.postUserSavingsTarget(
                {
                user_id: user_id,
                saving_target_id: SavingTargetId,
                amount: amount
                }
            )).then(resp => {
                if (resp.error) {
                    console.log(resp.error)
                    this.setState({ errorUST: resp.error })
                } else {
                    this.setState({submit: true})
                    console.log(resp)
                }
            })     
    }

    mapJoinPostRequests = (savingTargets) => {
        return savingTargets.map(savingTarget => API.postUserSavingsTarget(savingTarget))
    }

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
        const categoryOptions = [
            { key: 'd', text: 'Debt', value: 'Debt' },
            { key: 'v', text: 'Vacation', value: 'Vacation' },
            { key: 'p', text: 'Present', value: 'Present' },
            { key: 'h', text: 'Housing', value: 'Housing' },
            { key: 's', text: 'Savings', value: 'Savings' },
            { key: 'f', text: 'Family', value: 'Family' },
            { key: 'c', text: 'Car', value: 'Car' },
            { key: 'a', text: 'Charity', value: 'Charity' },
            { key: 'o', text: 'Other', value: 'Other' },
        ]

        return (
            <div className="wrapper">
                {!this.state.submit ?
                    <React.Fragment>
                <Segment placeholder>
                    <Grid columns={2} stackable textAlign='center'>
                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column>
                                <Header>Create Savings Plan</Header>
                            <Form error>
                                <Form.Group>
                                            <Form.Input label="Plan Name" placeholder='Name' name='name' value={name} onChange={this.handleChange} />
                                </Form.Group>

                                    {(this.state.errorST && this.state.errorUST && !this.state.name) ?
                                        <div className="make-center">
                                            <p>Please enter a valid Plan Name.</p>
                                        </div>
                                        :
                                        null
                                    }
                                <Form.Group>  
                                    <Form.Field
                                        control={Select}
                                        options={planOptions}
                                        label={{ children: 'Plan type?', htmlFor: 'planOptions' }}
                                        placeholder='Plan'
                                        search
                                        name="plan"
                                        value={plan}
                                        onChange={this.handleChange}
                                        searchInput={{ id: 'planOptions' }}
                                    />
                                </Form.Group>

                                    {(this.state.errorST && this.state.errorUST && !this.state.name) ?
                                        <div className="make-center">
                                            <p>Please enter a valid Plan type.</p>
                                        </div>
                                        :
                                        null
                                    }
                                <Form.Group>
                                    <Form.Field
                                        control={Select}
                                        options={categoryOptions}
                                        label={{ children: 'Category?', htmlFor: 'categoryOptions' }}
                                        placeholder='category'
                                        search
                                        name="category"
                                        value={category}
                                        onChange={this.handleChange}
                                        searchInput={{ id: 'categoryOptions' }}
                                    />
                                </Form.Group>
                                {(this.state.errorST && this.state.errorUST && !this.state.category) ?
                                    <div className="make-center">
                                        <p>Please enter a valid Category.</p>
                                    </div>
                                    :
                                    null
                                }
                                <Form.Group>
                                <Form.Input label="Image Url" placeholder='Image' name='target_image' value={target_image} onChange={this.handleChange}  />
                                </Form.Group>
                                    {(this.state.errorST && this.state.errorUST && !this.state.target_image) ?
                                        <div className="make-center">
                                            <p>Please enter a valid image url.</p>
                                        </div>
                                        :
                                        null
                                    }

                                <Form.Group>
                                <Form.Input type="number" label="Amount to save (£)" placeholder='Amount' name='amount' value={amount} onChange={this.handleChange} />
                                </Form.Group>

                                    {(this.state.errorST && this.state.errorUST && !this.state.target_image) ?
                                        <div className="make-center">
                                            <p>Please enter an amount to save.</p>
                                        </div>
                                        :
                                        null
                                    }
                                
                                <Form.Group>
                                    <DatesRangeInput
                                        label="Plan Start/End dates"
                                        name="datesRange"
                                        placeholder="From - To"
                                        value={this.state.datesRange}
                                        iconPosition="left"
                                                    minDate= {new Date()}
                                        onChange={this.handleChange} />
                                    
                                </Form.Group>

                                    {(this.state.errorST && this.state.errorUST && !this.state.start_date && !this.state.end_date ) ?
                                        <div className="make-center">
                                            <p>Please enter a valid start, and end date</p>
                                        </div>
                                        :
                                        null
                                    }
                                    <div class="ui medium primary button" onClick={(event) => this.handleSubmit(event)}>Create Plan <i class="right arrow icon"></i></div>
                                    {this.state.error ?
                                        <Message
                                            error
                                            header='Action Forbidden'
                                            content={this.state.error}
                                        />
                                        :
                                        null
                                    }
                            </Form>
                            </Grid.Column>
                            <Grid.Column>
                                    <div>
                                    {!this.state.target_image?
                                    <img src="https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/2014090/1360/2035/m1/fpnw/wm1/qdrpofpduuwwhs9zz7ayfuobitf8xwo42xcvdclixbrxaa4iabpct82rvc5zxrlf-.jpg?1481494830&s=dca5b92f8fe1937750c7cd78d4777c1d" id="savings-image1" alt="plant growing out of hand" />
                                    :
                                    <Segment>
                                        <img src={this.state.target_image}/>
                                    </Segment>
                                    }

                                    </div>
             
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                
            </Segment>
                <div className="historypad"></div>
        </React.Fragment>      
            :
                    <Redirect to="/home/exisitingplans" />
                }
            </div>
            


 


         )
    }
}
 
export default SavingsForm