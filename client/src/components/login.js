import React, { Component } from 'react'
import API from "../API"

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
                    signin(data.username)
                }
            })
    }



    render() {
        return (

            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h3 className="ui header">test-login</h3>
                    <form className="ui large form" onSubmit={() => this.handleSubmit()}>
                        <div className="segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="username" onChange={(event) => this.handleChange(event)} value={this.state.username} placeholder="E-mail address" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" onChange={(event) => this.handleChange(event)} value={this.state.password} placeholder="Password" />
                                </div>
                            </div>
                            <div className="ui fluid large teal submit button" onClick={() => this.handleSubmit()}>Login</div>
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