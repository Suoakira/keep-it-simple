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

            <div class="savings-background">
                <div class="ui text container" id="container1">
                    <div id="div1">
                    <Form inverted onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Input
                                label="Email"
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group>

                            <Form.Input
                                label="Username"
                                placeholder='Username'
                                name='username'
                                value={username}
                                onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input
                                label="Password"
                                placeholder='Password'
                                name='password'
                                type='password'
                                value={password}
                                onChange={this.handleChange} />
                        </Form.Group>
                        <div>
                            <div class="ui huge primary button" onClick={() => this.handleSubmit()}>Register <i class="right arrow icon"></i></div>
                        </div>

                    </Form>
                    </div>
                </div>
            </div>

        )
    }
}

export default Register