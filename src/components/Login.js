import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FlexboxGrid, Panel, Form, FormGroup, ControlLabel, Button, Content, Loader } from 'rsuite';


import fire from '../config/fire'

class Login extends Component {

    state = {
        email: "",
        password: "",
        error: "",
        submitted: false,
    }

    login = () => {
        this.setState({submitted: true});
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log(u);
            this.setState({ error: "" });
        }).catch((err) => {
            console.log(err);
            this.setState({ submitted: false, error: "Please fill in valid credentials" });
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            this.props.user ? <Redirect to="/" /> :
                <Content className="mt-5 mb-5">
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={8}>
                            <Panel header={<h3>Login</h3>} bordered className="p-1">
                                <Form fluid onSubmit={this.login}>
                                    {
                                        this.state.error ? <p>{this.state.error}</p> : null
                                    }
                                    <FormGroup>
                                        <ControlLabel>Email address</ControlLabel>
                                        <input className="rs-input" name="email" onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Password</ControlLabel>
                                        <input className="rs-input" name="password" type="password" onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button appearance="primary" type="submit">{
                                            this.state.submitted ? <Loader /> : 'Login'
                                        }</Button>
                                        <Link to="/signup" className="ml-3">First time here? Signup</Link>
                                    </FormGroup>
                                </Form>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
        )
    }
}

export default Login;

