import React, { Component } from 'react'
import _ from 'lodash'
import ResultRenderer from "./ResultRenderer"
import {   Grid, Header, Segment, Select, Form, Message, Search, Icon } from 'semantic-ui-react'

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
                arrayOfUTS: [],

                allUsers: undefined,
                results: undefined,
                groupUsers: [],
                mapToApi: []

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

    mapJoinPostRequests = (savingTargetId) => {
                let loggedInUser = {
                user_id: this.state.user_id,
                saving_target_id: undefined,
                amount: this.state.amount
                }
        const savingTargets = [...this.state.groupUsers]
        // cant just unshift here as user hasnt submitted their amount they should save yet
        savingTargets.unshift(loggedInUser)
        console.log(savingTargets)

    
        // return savingTargets.map(savingTarget => API.postUserSavingsTarget(savingTarget))
    }

// ------------------------------------ wtart adding a user to a plan -------------------------------------
    addUserToPlan = () => {
        if (this.state.results[0] && this.state.target) {
        console.log("added user to group")
        const copyUser = JSON.parse(JSON.stringify([...this.state.results][0]))
        console.log(copyUser)
        const amount = this.state.target
        console.log(amount)
        console.log(copyUser.id)
        this.setState({ 
            groupUsers: [...this.state.groupUsers,
            {user: copyUser,
            user_id: copyUser.id ,
            amount: amount}],
            mapToApi: [...this.state.mapToApi,
        {
            user_id: copyUser.id,
            saving_target_id: undefined,
            amount: amount
        }
            ]
        })
        } else {
            // replace this alert box
            alert("you didnt enter a user or amount (placeholder alert)")
        }
    }

    mapGroupUsers = () => {
        const copyGroupUsers = [...this.state.groupUsers]
        return copyGroupUsers.map(groupMember => <p>{groupMember.user.username} {groupMember.amount}  </p>)

    }

    // ----------------------------------- end adding a user to plan ------------------------------------

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/users")
        .then(resp => resp.json())
            .then(data => this.setState({
                storedUserDetails: this.props.storedUserDetails,
                user_id: this.props.storedUserDetails.id,
                allUsers: data
            }) 
        )
    }

    // --------------------------Search Feature Start ------------------------------------------ //
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.username })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.username)

            this.setState({
                isLoading: false,
                results: _.filter(this.state.allUsers, isMatch)
            })
        }, 300)
    }
    // --------------------------Search Feature End ------------------------------------------ //

    render() { 
        const { name, category, target_image, amount, plan, isLoading, value, allUsers, results } = this.state
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
        this.mapJoinPostRequests()

        return (
            <div className="wrapper">
                {!this.state.submit ?
                    <React.Fragment>
                <Segment placeholder>
                            <Grid columns={2} stretched verticalAlign="middle">
                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column width={8}>
                                <Header>Create Savings Plan</Header>
                            <Form error>
                                <Form.Group>
                                    <Form.Input label="Plan Name" placeholder='Name' name='name' value={name} onChange={this.handleChange} />
                                </Form.Group>

                                    {(this.state.errorST && this.state.errorUST && !this.state.name) &&
                                        <div className="make-center">
                                            <p>Please enter a valid Plan Name.</p>
                                        </div>
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
                                    {(this.state.plan === "Group") &&
                                    /* this should be in a modal popup */
                                    <Form.Group>  
                                        <Form.Field>
                                            <b>Add a User and amount they should save</b>
                                                {this.state.groupUsers[0] &&
                                                    <Segment>
                                                        {this.mapGroupUsers()}
                                                    </Segment>
                                                }
                                        <Search
                                                loading={isLoading}
                                                placeholder="Enter Username..."
                                                onResultSelect={this.handleResultSelect}
                                                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                                                results={results}
                                                value={value}
                                                {...this.props}
                                                resultRenderer={ResultRenderer}
                                            />
                                                {/* not wired up yet */}
                                                    <Icon name='pound sign' />Amount<Form.Input type="number" name='target' value={name} onChange={this.handleChange}></Form.Input>
                                                <button onClick={() => this.addUserToPlan()}class="mini primary ui button">
                                                    Add User
                                                </button>
                                            </Form.Field>
                                        </Form.Group>  
                                    }
        
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
                            <Grid.Column width={8}>
                                    <div>
                                    {!this.state.target_image?
                                                <img src="https://www.mstreetbank.com/wp-content/uploads/2018/04/piggy-bank-update.jpg" id="savings-image1" alt="plant growing out of hand" />
                                    :
                                    <div className="width-container">
                                        <Segment>
                                                <img src={this.state.target_image}/>
                                        </Segment>
                                    </div>
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