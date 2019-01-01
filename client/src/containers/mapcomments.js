import React, { Component } from 'react'
import { Modal, Button, Comment, Form, Header } from 'semantic-ui-react'
import CommentCard from "../components/commentcard"
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

        API.postComment(comment)
            .then(data => {
                if (data.error) {
                    console.log(`error: ${data.error}`)
                } else {
                    this.setState({
                        userComments: [...this.state.userComments, data]
                    })
                }
            })
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
        const { open, close } = this.props
        return (
            <Modal dimmer="blurring" open={open} onClose={close} closeOnDimmerClick={false} centered={false}>
                <Modal.Content>
     
                    <Comment.Group>
                        <Header as='h3' dividing>
                            Comments
                        </Header>
                        {(this.props.userSavingTargets && this.state.users) ?
                                this.mapComments()
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


