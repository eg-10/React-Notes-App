import React, { Component } from 'react';
import { Modal, Button, Form, FormControl, FormGroup, ButtonToolbar } from 'rsuite';

class LinkModal extends Component {
    
    render() {
        let name='';
        let link='';
        return (
            <Modal size="xs" backdrop={true} show={this.props.show} onHide={this.props.close}>
                <Modal.Header>
                    <Modal.Title>Add a Link</Modal.Title>
                </Modal.Header>
                <Form fluid={true} onSubmit={() => { this.props.submit(name, link) }} >
                    <Modal.Body>
                        <FormGroup>
                            <FormControl onChange={(value) => {name=value;}} placeholder="Name / Short Description" name="name" />
                            <FormControl onChange={(value) => {link=value;}} placeholder="Link" name="link" />
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

export default LinkModal;