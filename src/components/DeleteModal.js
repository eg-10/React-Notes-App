import React, { Component } from 'react';
import { Modal, Button, ButtonToolbar } from 'rsuite';

class DeleteModal extends Component {

    render() {
        return (
            <Modal className="align-self-center" size="xs" backdrop={true} show={this.props.show} onHide={this.props.close}>
                <Modal.Header>
                    <Modal.Title>Delete "{this.props.name}" ?</Modal.Title>
                </Modal.Header>
                <br /><br />
                <ButtonToolbar>
                    <Button onClick={this.props.delete} appearance="primary" color="red">Delete</Button>
                    <Button onClick={this.props.close} appearance="default">Cancel</Button>
                </ButtonToolbar>
            </Modal>
        )
    }
}

export default DeleteModal;