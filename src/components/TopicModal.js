import React, { Component } from 'react';
import { Modal, Button, Form, FormControl, FormGroup, ButtonToolbar } from 'rsuite';

class TopicModal extends Component {
    
    render() {
        let name='';
        return (
            <Modal size="xs" backdrop={true} show={this.props.show} onHide={this.props.close}>
                <Modal.Header>
                    <Modal.Title>Add a Topic</Modal.Title>
                </Modal.Header>
                <Form fluid={true} onSubmit={() => { this.props.addTopic(name) }} >
                    <Modal.Body>
                        <FormGroup>
                            <FormControl onChange={(value) => {name=value;}} style={{ width: '100%' }} placeholder="Topic Name" name="name" />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button type="submit" appearance="primary">Add</Button>
                                <Button onClick={this.props.close} appearance="default">Cancel</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default TopicModal;