import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'
import API from "../API"


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
            
                   <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
              
                            <Form.Input placeholder='Name' name='name' value={name} onChange={this.handleChange} />
                            <Form.Input placeholder='Category' name='category' value={category} onChange={this.handleChange} />
                            <Form.Input placeholder='Image' name='target_image' value={target_image} onChange={this.handleChange} />
                            <Form.Input placeholder='Amount' name='amount' value={amount} onChange={this.handleChange} />

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
                            <DatesRangeInput
                                name="datesRange"
                                placeholder="From - To"
                                value={this.state.datesRange}
                                iconPosition="left"
                                onChange={this.handleChange} />
                            <Form.Button content='Submit' />
                        </Form.Group>
                    </Form>
         )
    }
}
 
export default SavingsForm