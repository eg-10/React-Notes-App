import React, { Component } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import { FlexboxGrid, Panel, Form, FormGroup, ControlLabel, Button, Content, Loader } from 'rsuite';
import emailjs from 'emailjs-com';

import fire from '../config/fire';

class Signup extends Component {

    state = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        error: "",
        created: false,
        submitted: false,
    }

    signup = () => {
        this.setState({submitted: true});
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log(u);
            axios.put('https://notes-app-ad40a.firebaseio.com/users/'+u.user.uid+'.json', {
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
            })
                .then(() => {
                    this.sendWelcomeEmail(this.state.first_name, this.state.email);
                    this.setState({ created: true, error: "" });
                })
                .catch((errors) => console.log(errors));
        }).catch((err) => {
            console.log(err);
            this.setState({ submitted: false, error: "Please fill in valid details" });
        })
    }

    sendWelcomeEmail = (to_name, to_email) => {
        var templateParams = {
            to_name: to_name,
            to_email: to_email,
        };
        emailjs.send(
            process.env.REACT_APP_SERVICE_ID, 
            process.env.REACT_APP_TEMPLATE_ID, 
            templateParams, 
            process.env.REACT_APP_USER_ID)
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
               console.log('FAILED...', error);
            });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            this.props.user && this.state.created  ? <Redirect to="/" /> :
                <Content className="mt-5 mb-5">
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={8}>
                            <Panel header={<h3>Sign Up</h3>} bordered className="p-1">
                                <Form fluid onSubmit={this.signup}>
                                    {
                                        this.state.error ? <p>{this.state.error}</p> : null
                                    }
                                    <FormGroup>
                                        <ControlLabel>First Name</ControlLabel>
                                        <input className="rs-input" name="first_name" onChange={this.handleChange} />
                                        <ControlLabel>Last Name</ControlLabel>
                                        <input className="rs-input" name="last_name" onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Email address</ControlLabel>
                                        <input className="rs-input" name="email" onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Password</ControlLabel>
                                        <input className="rs-input" name="password" type="password" onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button appearance="primary" type="submit" >{
                                            this.state.submitted ? <Loader /> : 'Sign Up'
                                        }</Button>
                                        <Link to="/login" className="ml-3">Already Have an Account? Login</Link>
                                    </FormGroup>
                                </Form>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
        )
    }
}

export default Signup;

