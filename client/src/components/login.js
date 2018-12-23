import React, { Component } from 'react'
import API from "../API"
import { Link, Redirect } from "react-router-dom"
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { signin } = this.props
        const user = this.state
        API.signin(user)
            .then(data => {
                if (data.error) {
                    console.log(`error: ${data.error}`)
                } else {
                    signin(data)
                    console.log(data)
                }
            })
        }

    render() {
        const { username, password } = this.state
        return (
            <div class="ui one column stackable center aligned page grid">
                <div class="column six wide">
                    <h3 className="">Login</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <div className="segment">                  
                                <div className="ui left icon input">        
                                    <Form.Input 
                                    placeholder='Username' 
                                    name='username' 
                                    value={username} 
                                    onChange={this.handleChange} />              
                                </div>                   
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <Form.Input 
                                    placeholder='Password' 
                                    name='password' 
                                    type="password"
                                    value={password} 
                                    onChange={this.handleChange} />
                                </div>        
                                <div>
                                    <Form.Button 
                                    content='Submit'
                                        onClick={() => this.handleSubmit()}
                                        />
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
    }
}
 
export default Login