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


            <div class="savings-background">
                <div class="ui text container" id="container1">
                    <div id="div1">
                        <Form  inverted onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <div className="segment">
                                        <Form.Group>
                                            <Form.Input
                        
                                                label="Username"
                                                placeholder='Username'
                                                name='username'
                                                value={username}
                                                onChange={this.handleChange} />
                                        </Form.Group>
                                
                                    <div className="ui left icon input">
                                        <i className="lock icon"></i>
                                        <Form.Group>
                                            <Form.Input
                                                label="Password"
                                                placeholder='Password'
                                                name='password'
                                                type="password"
                                                value={password}
                                                onChange={this.handleChange} />
                                        </Form.Group>
                                    </div>
                                    <div>
            
                                        <div class="ui huge primary button" onClick={() => this.handleSubmit()}>Login <i class="right arrow icon"></i></div>
                         
                                    </div>
                                </div>
                            </Form.Group>
                        </Form>
                </div>
                </div>

            </div>


            // <div class="ui one column stackable center aligned page grid">
            //     <div class="column six wide">
            //         <h3 className="">Login</h3>

            //     </div>
            // </div>
        )
    }
}
 
export default Login