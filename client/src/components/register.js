import React, { Component } from 'react'
import { Link } from "react-router-dom"

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

    handleChange = (event) =>
        this.setState({ [event.target.name]: event.target.value })

    handleSubmit = () => {
        const { signin } = this.props
        const user = this.state
        API.signup({ user: user })
            .then(data => {
                if (data.error) {
                    console.log(`error: ${data.error}`)
                } else {
                    signin(data)
                }
            })
        }

    render() {
        return (

            <div class="ui one column stackable center aligned page grid">
                <div class="column six wide">
                   

                    <h3 className="ui header">test-register</h3>
                    <form className="ui large form" onSubmit={() => this.handleSubmit()}>
                        <div className="segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="email" onChange={(event) => this.handleChange(event)} value={this.state.email} placeholder="E-mail address" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="username" onChange={(event) => this.handleChange(event)} value={this.state.username} placeholder="Username" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" onChange={(event) => this.handleChange(event)} value={this.state.password} placeholder="Password" />
                                </div>
                            </div>
                            <Link to="/">
                                <div className="ui fluid large teal submit button" onClick={() => this.handleSubmit()}>Register
                                </div>
                            </Link>
                        </div>
                        <div className="ui error message">
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default Register