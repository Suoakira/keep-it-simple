import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class DeleteModal extends Component {

    state = {}

    

    render() {
        const { openDelete, closeDelete, name, closeAndDelete } = this.props
        return (
            <div>
                <Modal dimmer="blurring" size="mini" closeOnDimmerClick={false} open={openDelete} onClose={closeDelete}>
                    <Modal.Header>Delete Plan</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete <b>{name}</b></p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => closeDelete()}negative>No</Button>
                        <Button onClick={() => closeAndDelete()}positive icon='checkmark' labelPosition='right' content='Yes' />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default DeleteModal