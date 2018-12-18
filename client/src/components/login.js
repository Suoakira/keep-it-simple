import React, { Component } from 'react'
import API from "../API"
import { Link, Redirect } from "react-router-dom"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (event) =>
        this.setState({ [event.target.name]: event.target.value })

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
        return (
            <div class="ui one column stackable center aligned page grid">
                <div class="column six wide">
                    
                    <h3 className="">Login</h3>
                    <form className="ui large form" onSubmit={() => this.handleSubmit()}>
                        <div className="segment">
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
                            <div className="ui fluid large black submit button" onClick={() => this.handleSubmit()}>
                                Login
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
 
export default Login