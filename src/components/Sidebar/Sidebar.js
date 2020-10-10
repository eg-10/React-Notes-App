import React, { Component } from 'react';
import { Nav, Dropdown, Sidenav, Icon, Loader } from 'rsuite';
import { NavLink } from 'react-router-dom'

import './Sidebar.css'

import TopicModal from '../TopicModal';

class Sidebar extends Component {
    render() {

        let topics = [];
        if (this.props.topics) {
            for (const entry in this.props.topics) {
                topics.push({
                    id: entry,
                    ...this.props.topics[entry]
                })
            }
        }
        return (
            <Sidenav className="sidebar" defaultOpenKeys={['3']}>
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item componentClass={NavLink} exact to="/" className="text-decoration-none" icon={<Icon icon="home" />}>
                            Home
                        </Nav.Item>
                        <Nav.Item icon={<Icon icon="plus" />} onClick={this.props.open_topic_modal}>
                            Add Topic
                        </Nav.Item>
                        <TopicModal addTopic={this.props.addTopic} show={this.props.show_topic_modal} close={this.props.close_topic_modal} />
                        <Dropdown eventKey="3" title="Your Topics" icon={<Icon icon="pencil-square" />}>
                            {
                                this.props.topics_loading ?
                                    <Dropdown.Item><Loader speed="fast" /></Dropdown.Item> :
                                    topics.map((topic) => {
                                        return (
                                            <Dropdown.Item componentClass={NavLink} className="text-decoration-none" key={topic.id} to={'/topics/' + topic.id}>
                                                {topic.name}
                                            </Dropdown.Item>
                                        );
                                    })
                            }
                        </Dropdown>
                        <Nav.Item eventKey="4" icon={<Icon icon="sign-out" />} onClick={this.props.logout} >
                            Logout
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        )
    }
}

export default Sidebar;