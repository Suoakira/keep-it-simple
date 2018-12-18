import React, { Component } from 'react'
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';

class SavingsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            plan: '',
            start_date: '',
            end_date: '',
            target_image: '',
            category: '',
            date: '',
            time: '',
            dateTime: '',
            datesRange: ''
        };
    }



    // this handle change is specifically for date periods
    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
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
                                <input placeholder="Category" type="text" />
                                </div>
                            </div>

                            <div class="ui selection simple segment dropdown">
                                
                                <input type="hidden" name="gender" />
                                <i className="dropdown icon"></i>
                                <div className="default text">
                                    Plan Type
                                </div>
                                <div className="menu">
                                    <div className="item" data-value="1">Group Plan</div>
                                    <div className="item" data-value="0">Personal Plan</div>
                                </div>
                            </div>

                            <div className="field">
                                <label>
                                    Name your plan
                            </label>
                                <input placeholder="Image link" type="text" />
                            </div>

                            <div className="field">
                            <label>
                                Post an image of your goal to keep you Motivated
                            </label>
                                <input placeholder="Image link" type="text" />
                            </div>
                            
                        <div className="field">
                            <label>Amount would you'd like to save?</label>
                            <input placeholder="Amount" type="text" />
                        </div>

                        <div className="field">
                            <label>Timescale</label>
                        
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