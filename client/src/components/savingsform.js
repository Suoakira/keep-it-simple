import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'


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
                // userSavingTargets
                // user_id: undefined,
                // saving_target_id: undefined,
                amount: undefined,
            }
        }
    

    // handleChange = (e, { value }) => this.setState({ value })

    // this handle change is specifically for date periods
    // handleChange = (event, { name, value }) => {
    //     if (this.state.hasOwnProperty(name)) {
    //         this.setState({ [name]: value })
    //     }
    // }


    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { name, category, target_image } = this.state

        this.setState({ 
            submittedName: name, 
            submittedEmail: category,
            submittedImage: target_image

        
        })
    }

    render() { 
        const { value } = this.state
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
                                placeholder='Gender'
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