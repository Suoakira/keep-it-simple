import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"
import { Header, Label, Message, Icon } from 'semantic-ui-react'
import {
    Form, Input, TextArea, Checkbox, Radio, RadioGroup, Dropdown, Select,
} from 'formsy-semantic-ui-react'


import API from "../API"


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            usernameValid: false,
            passwordValid: false,
            emailValid: false,
            error: ""


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
                    this.setState({ error: data.error })
                } else {
                    signin(data)
                    console.log(`${data.username} has been signed in`)
                }
            }).then(() => this.setState({ username: '', password: '', email: ""  }))
        }

    render() {
        const { username, password, email } = this.state
        return (
            this.props.username ?
                <Redirect
                    to="/home/newplan" />
                :
            <div class="savings-background">
                <div class="ui text container" id="container1">
                    <div id="div1">
                    <Header size='huge'>Keep It Simple
                        <Header.Subheader>An easier way to manage your savings.</Header.Subheader>
                    </Header>
                    <Form onSubmit={this.handleSubmit} error>
                        <Form.Group>
                            <Form.Input
                                required
                                label="Email"
                                placeholder='Email'
                                name='email'
                                value={email.toLowerCase()}
                                onChange={this.handleChange}
                                validations="isEmail"
                                validationErrors={{ isEmail: 'Email not valid' }}
                                errorLabel={<Label color="red" pointing />}
                                 />
                        </Form.Group>
                        <Form.Group>

                            <Form.Input
                                required
                                label="Username"
                                placeholder='Username'
                                name='username'
                                value={username}
                                onChange={this.handleChange}
                                 />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input
                                required
                                label="Password"
                                placeholder='Password'
                                name='password'
                                type='password'
                                value={password}
                                onChange={this.handleChange}
                                validations="minLength:8"
                                validationErrors={{
                                    minLength: 'Minimin of 8 characters',
                                    isDefaultRequiredValue: 'Password is Required',
                                }}
                                errorLabel={<Label color="red" pointing="left" />}
                                
                                 />

                        </Form.Group>
                                {this.state.error ?
                                    <Message
                                        style={{ width: "40%" }}
                                        error
                                        header='Action Forbidden'
                                        content={this.state.error}
                                    />
                                    :
                                    null
                                }
           

                             
                        <div>
                            <div class="ui huge primary button" onClick={() => this.handleSubmit()}>Register <i class="right arrow icon"></i></div>
                        </div>
                        <div class="ui text container">
                            <b>        
                            Already have an account? Sign in <Link to="/login">here</Link>.
                            </b>
                        </div>

                    </Form>
                    </div>
                </div>
            </div>

        )
    }
}

export default Register