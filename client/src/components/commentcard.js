import React from 'react'
import { Comment } from 'semantic-ui-react'

const CommentExampleComment = (props) => (
   
        <Comment>
        <Comment.Avatar src={ props.image } />
            <Comment.Content>
                <Comment.Author as='a'>{props.username}</Comment.Author>
                <Comment.Metadata>
                    <div>{new Date(props.date).toDateString()}</div>
                </Comment.Metadata>
                <Comment.Text>{props.comment}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
        </Comment>        
)

export default CommentExampleComment