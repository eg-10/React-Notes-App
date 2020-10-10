import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, ButtonToolbar, Input } from 'rsuite';

class NoteModal extends Component {
    
    render() {
        var name='';
        var content='';
        if (this.props.note) {
            name = this.props.note.name;
            content = this.props.note.content;
        }
        return (
            <Modal size="sm" backdrop={true} show={this.props.show} onHide={this.props.close}>
                <Modal.Header>
                    <Modal.Title>{
                        this.props.note ?
                        this.props.note.name :
                        "Add a Note"
                    }</Modal.Title>
                </Modal.Header>
                <Form fluid={true} onSubmit={() => { this.props.submit(name, content) }} >
                    <Modal.Body>
                        <FormGroup>
                            <Input defaultValue={name} onChange={(value) => {name=value;}} placeholder="Title / Short Description" name="name" />
                            <Input defaultValue={content} componentClass="textarea" rows={10} onChange={(value) => {content=value;}} placeholder="Content" name="content" />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button type="submit" appearance="primary">{this.props.note ? "Update" : "Add"}</Button>
                                <Button onClick={this.props.close} appearance="default">Cancel</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default NoteModal;