import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Icon } from 'rsuite';

class CustomNavbar extends Component {

    render() {
        return (
            <Navbar style={{borderBottom: "1px solid #3c3f43"}}>
                <div className="container">
                    <Navbar.Header>
                        <Nav>
                            <Nav.Item icon={<Icon icon="book" />} componentClass={NavLink} to="/">
                                Notes App
                            </Nav.Item>
                        </Nav>
                    </Navbar.Header>
                    <Navbar.Body>
                        {
                            this.props.user ?
                                <Nav pullRight>
                                    <Nav.Item icon={<Icon icon="sign-out" />} onClick={this.props.logout} >Logout</Nav.Item>
                                </Nav> :
                                <div>
                                    <Nav pullRight>
                                        <Nav.Item icon={<Icon icon="user-plus" />} componentClass={NavLink} to="/signup" >Sign Up</Nav.Item>
                                    </Nav>
                                    <Nav pullRight>
                                        <Nav.Item icon={<Icon icon="sign-in" />} componentClass={NavLink} to="/login" >Login</Nav.Item>
                                    </Nav>
                                </div>
                        }
                    </Navbar.Body>
                </div>
            </Navbar>
        )
    }
}

export default CustomNavbar;