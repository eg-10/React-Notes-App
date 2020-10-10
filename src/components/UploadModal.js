import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, ButtonToolbar, Loader } from 'rsuite';

import fire from '../config/fire'

class UploadModal extends Component {

    state = {
        name: '',
        files: null,
        loading: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFileChange = (e) => {
        this.setState({
            files: e.target.files
        })
    }

    handleSave = () => {
        this.setState({ loading: true });
        let bucketName = "files";
        let file = this.state.files[0];
        var filename = new Date().getTime() + '_' + file.name;
        let storageRef = fire.storage().ref().child(bucketName + '/' + filename);
        let uploadTask = storageRef.put(file);
        console.log(fire.storage.TaskState);
        console.log(fire.storage.TaskEvent);
        uploadTask.on('state_changed', null, null, () => {
            uploadTask.snapshot.ref.getDownloadURL()
                .then((url) => {
                    console.log(this.state.name, ':', url);
                    this.props.submitFile(this.state.name, filename, url);
                })
                .catch((errors) => console.log(errors));
        });
    };

    //   showImage = () => {
    //     let storageRef = firebase.storage().ref();
    //     let spaceRef = storageRef.child(`image/${this.state.files[0].name}`);
    //     storageRef
    //       .child(`image/${this.state.files[0].name}`)
    //       .getDownloadURL()
    //       .then((url) => {
    //         console.log(url);
    //         document.getElementById("new-image").src = url;
    //       });
    //   };

    render() {
        return (
            <Modal size="xs" backdrop={true} show={this.props.show} onHide={this.props.close}>
                <Modal.Header>
                    <Modal.Title>Add a {this.props.title}</Modal.Title>
                </Modal.Header>
                {
                    this.state.loading ?
                        <div className="mt-5 mb-5 text-center">
                            <Loader />
                        </div> :
                        <Form fluid={true} >
                            <Modal.Body>
                                <FormGroup>
                                    <input className="rs-input" onChange={this.handleChange} placeholder="Name / Short Description" name="name" />
                                    <input
                                        className="rs-input"
                                        type="file"
                                        onChange={this.handleFileChange}
                                        placeholder="File Upload"
                                        name="files"
                                    />
                                </FormGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <FormGroup>
                                    <ButtonToolbar>
                                        <Button onClick={this.handleSave} appearance="primary">Add</Button>
                                        <Button onClick={this.props.close} appearance="default">Cancel</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Modal.Footer>
                        </Form>
                }
            </Modal>
        )
    }
}

export default UploadModal;