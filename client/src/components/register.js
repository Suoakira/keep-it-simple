import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

import API from "../API"


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""

        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { signin } = this.props
        const user = this.state
        API.signup({ user: user })
            .then(data => {
                if (data.error) {
                    console.log(`error: ${data.error}`)
                } else {
                    signin(data)
                    console.log(`${data.username} has been signed in`)
                }
            })
        }

    render() {
        const { username, password, email } = this.state
        return (

            <div class="ui one column stackable center aligned page grid">
                <div class="column six wide">
                    <h3 className="ui header">Register</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <div className="ui left icon input">
                            <Form.Input
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={this.handleChange} />
                        </div>
                        <div className="ui left icon input">
                            <Form.Input
                                placeholder='Username'
                                name='username'
                                value={username}
                                onChange={this.handleChange} />
                        </div>
                        <div className="ui left icon input">
                            <Form.Input
                                placeholder='Password'
                                name='password'
                                type='password'
                                value={password}
                                onChange={this.handleChange} />
                        </div>
                            <Form.Button
                                content='Submit'
                                onClick={() => this.handleSubmit()}
                            />
                        <div className="ui error message">
                        </div>
                    </Form>
                </div>
            </div>

        )
    }
}

export default Register