import React, { Component } from 'react'
import { Modal, Button, Comment, Form, Header } from 'semantic-ui-react'
import CommentCard from "../components/CommentCard"
import API from "../API"

class MapComments extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            comment: undefined
         }
    }

    userFromId = (id) => {
        const copyUsers = [...this.state.users]
        const user = copyUsers.filter(user => user.id === id)[0]
        return [user.username, user.image_url]
    }

    mapComments = () => {
        console.log(this.props.savingTargets)
        const copyComments = [...this.state.userComments]
        return copyComments.map(comment => 
        <CommentCard 
        comment={comment.text} 
        date={comment.created_at} 
        username={this.userFromId(comment.user_id)[0]}
        image={this.userFromId(comment.user_id)[1]}  
        />
          )
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {

        const comment = {
            user_id: this.props.userId,
            saving_target_id: this.props.savingTargetId,
            text: this.state.comment            
        }
        
        this.updateScroll()

        API.postComment(comment)
            .then(data => {
                if (data.error) {
                    console.log(`error: ${data.error}`)
                } else {
                    this.setState({
                        userComments: [...this.state.userComments, data]
                    }, () => this.updateScroll())
                }
            })
    }

    updateScroll = () => {
    const element = document.querySelector(".box-area")
    element.scrollTop = element.scrollHeight
}

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/users")
            .then(data => data.json())
            .then(users => this.setState({ 
                users: users,
                userComments: this.props.userSavingTargets.comments
            }))
    }

    render() { 
        const { comment } = this.state
        const { open, close, savingTargets } = this.props
        return (
            
            <Modal dimmer="blurring" size="small" open={open} onClose={close} closeOnDimmerClick={false} centered={false}>
                
                <Modal.Content>
                    <Comment.Group centered={true}>
                        <Header as='h3' dividing>
                            {(savingTargets.plan == "group") ?
                            "Comments"
                            :
                            "Notes"
                            }
                        </Header>
                        {(this.props.userSavingTargets && this.state.users && this.state.userComments) ?
                        <div className="box-area">
                                {this.mapComments()}
                        </div>
                                :
                                null
                            }
                        <Form reply>
                            <Form.TextArea
                                name='comment'
                                value={comment}
                                onChange={this.handleChange}
                                 />
                        <Button onClick={() => this.handleSubmit()} content='Add Reply' labelPosition='left' icon='edit' primary />
                        </Form>
                    </Comment.Group>
                 
                </Modal.Content>
          
                <Modal.Actions>
                    <Button
                        primary
                        icon='checkmark'
                        labelPosition='right'
                        content="Close"
                        onClick={close}
                    />
                </Modal.Actions>
         
            </Modal>
          )
    }
}
 
export default MapComments


