import React, { Component } from 'react'


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
    

    handleInputChange = (event) =>
        this.setState({ [event.target.name]: event.target.value })




    // this handle change is specifically for date periods
    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value })
        }
    }


    render() { 
        return (
            <div className="center-me"> 
            <div className="ui one column stackable left aligned page grid">
                <div className="column eight wide">
                    <h3 className="">Create a Savings plan</h3>
                    <form className="ui large form" onSubmit={() => this.handleSubmit()}>
                            <div className="segment">
                                <div class="field">
                                <label className="ui left">
                                    Savings Category
                                </label>
                                    <input placeholder="Category" type="text" name="category" onChange={(event) => this.handleInputChange(event)} value={this.state.category} />
                                </div>
                            </div>

                            <div className="field">
                                <label>
                                    Name your plan
                            </label>
                                <input placeholder="Image link" type="text" name="name" onChange={(event) => this.handleInputChange(event)} value={this.state.name} />
                            </div>

                            <div className="field">
                            <label>
                                Post an image of your goal to keep you Motivated
                            </label>
                                <input placeholder="Image link" type="text" name="target_image" onChange={(event) => this.handleInputChange(event)} value={this.state.target_image} />
                            </div>
                            
                        <div className="field">
                            <label>Amount would you'd like to save?</label>
                                <input placeholder="Amount" type="number" name="amount" onChange={(event) => this.handleInputChange(event)} value={this.state.amount} />
                        </div>

                        <div className="field">
                            <label>Start Date & End Date</label>
                        
                        <DatesRangeInput
                            name="datesRange"
                            placeholder="From - To"
                            value={this.state.datesRange}
                            iconPosition="left"
                            onChange={this.handleChange} />
                        </div>
      
                        <div className="ui fluid large black submit button" onClick={() => this.handleSubmit()}>
                            Create Goal
                        </div> 
                    </form>
                </div>
            </div>
        </div>

        

                    
         )
    }
}
 
export default SavingsForm