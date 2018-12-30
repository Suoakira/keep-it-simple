import React, { Component } from 'react'
import API from "../API"
import { Link, Redirect } from "react-router-dom"
import { Form, Input, TextArea, Button, Icon, Header } from 'semantic-ui-react'

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
        const { signin } = this.props
        const { username, password } = this.state
        return (

        this.props.username?
            <Redirect
                to="/home/newplan" /> 
                    :
            <div class="savings-background">
                <div class="ui text container" id="container1">
                    <div id="div1">
                        <Form onSubmit={this.handleSubmit}>
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
                                        <div class="ui text container">
                                            <b>
                                                Dont have an account? <Link to="/register">Register</Link>.
                                            </b>
                                        </div>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </div>

            </div>
        )
    }
}
 
export default Login