import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { Link } from "react-router-dom"

const ModalBasicExample = (props) => (
    <Modal open="true" basic size='small'>
        <Header icon='sign in alternate' content='Please Sign in' />
        <Modal.Content>
            <p>
                You must be logged in to view this page.   
                Please<Link to="/login">Login</Link> or <Link to="/Register">Register.</Link>
            </p>
        </Modal.Content>
        <Modal.Actions>
            <Button basic color='red' inverted>
                <Icon name='remove' /> No
      </Button>
            <Button color='green' inverted>
                <Icon name='checkmark' /> Yes
      </Button>
        </Modal.Actions>
    </Modal>
)

export default ModalBasicExample