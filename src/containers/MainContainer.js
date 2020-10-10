import React, { Component } from 'react';
import { Grid, Row, Col, Container, Content, Panel, Loader } from 'rsuite';
import axios from 'axios';
import { Switch, Route, Redirect } from "react-router-dom";

import Sidebar from '../components/Sidebar/Sidebar';
import TopicPanel from '../components/TopicPanel';
import HomePanel from '../components/HomePanel';
import fire from '../config/fire';


class MainContainer extends Component {

    state = {
        show_topic_modal: false,
        topics: null,
        topics_loading: false,
        current_topic: null,
        show_link_modal: false,
        first_name: "",
        last_name: "",
        show_files_modal: false,
        show_images_modal: false,
        show_delete_modal: false,
        show_notes_modal: false,
        selected_id: "",
    }

    componentDidMount() {
        console.log(this.props.user);
        if (this.props.user) {
            this.getTopics();
        }
    }


    getTopics = () => {
        this.setState({ topics_loading: true });
        axios.get('https://notes-app-ad40a.firebaseio.com/users/' + this.props.user.uid + '.json')
            .then((response) => {
                let topics = response.data.topics;
                for (const entry in topics) {
                    topics[entry] = { ...topics[entry], id: entry };
                }
                this.setState({
                    topics: topics,
                    topics_loading: false,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                });
            })
            .catch((errors) => {
                console.log(errors);
            });
        // axios.get('https://notes-app-ad40a.firebaseio.com/topics.json')
        //     .then((response) => {
        //         let topics = response.data;
        //         for (const entry in topics) {
        //             topics[entry] = { ...topics[entry], id: entry };
        //         }
        //         this.setState({ topics: topics, topics_loading: false });
        //     })
        //     .catch((errors) => {
        //         console.log(errors);
        //     });
    }

    addTopic = (name) => {
        this.setState({ show_topic_modal: false });
        axios.post('https://notes-app-ad40a.firebaseio.com/users/' + this.props.user.uid + '/topics.json', {
            name: name,
        })
            .then((response) => {
                console.log(response);
                this.getTopics();
            })
            .catch((errors) => console.log(errors));
    }

    deleteEntryHandler = (topic_id, type, entry_id, filename) => {
        this.setState({ show_delete_modal: false });
        axios.delete(
            'https://notes-app-ad40a.firebaseio.com/users/' +
            this.props.user.uid +
            '/topics/' + topic_id +
            '/' + type + '/' +
            entry_id + '.json'
        )
            .then((response) => {
                console.log(response);
                console.log(response.data);
                this.getTopics();
                if (filename) {
                    this.deleteFile(filename);
                }
            })
            .catch((errors) => console.log('errors:', errors));
    }

    deleteFile = (filename) => {
        var desertRef = fire.storage().ref().child('files/' + filename);
        desertRef.delete().then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    close_delete_modal = () => {
        this.setState({ show_delete_modal: false, selected_id: "" });
    }

    open_delete_modal = (id) => {
        this.setState({ show_delete_modal: true, selected_id: id });
    }

    close_notes_modal = () => {
        this.setState({ show_notes_modal: false, selected_id: "" });
    }

    open_notes_modal = (id) => {
        console.log(id);
        this.setState({ show_notes_modal: true, selected_id: id });
    }

    noteSubmitHandler = (topic_id, name, content, note_id) => {
        this.setState({ show_notes_modal: false });
        let url = 'https://notes-app-ad40a.firebaseio.com/users/' + this.props.user.uid + '/topics/' + String(topic_id) + '/notes.json';
        if (note_id) {
            url = 'https://notes-app-ad40a.firebaseio.com/users/' + this.props.user.uid + '/topics/' + String(topic_id) + '/notes/'+note_id+'.json';
            axios.put(url, {
                name: name,
                content: content
            })
                .then((response) => {
                    console.log(response);
                    this.getTopics();
                })
                .catch((errors) => console.log(errors));
        }
        else {
            axios.post(url, {
                name: name,
                content: content
            })
                .then((response) => {
                    console.log(response);
                    this.getTopics();
                })
                .catch((errors) => console.log(errors));
        }
    }

    close_topic_modal = () => {
        this.setState({ show_topic_modal: false });
    }

    open_topic_modal = () => {
        this.setState({ show_topic_modal: true });
    }

    topicSelectHandler = (index) => {
        this.setState({ current_topic: { ...this.state.topics[index] } });
    }

    close_link_modal = () => {
        this.setState({ show_link_modal: false });
    }

    open_link_modal = () => {
        this.setState({ show_link_modal: true });
    }

    linkSubmitHandler = (topic_id, name, link) => {
        this.setState({ show_link_modal: false });
        axios.post('https://notes-app-ad40a.firebaseio.com/users/' + this.props.user.uid + '/topics/' + String(topic_id) + '/links.json', {
            name: name,
            link: link
        })
            .then((response) => {
                console.log(response);
                this.getTopics();
            })
            .catch((errors) => console.log(errors));
    }

    close_files_modal = () => {
        this.setState({ show_files_modal: false });
    }

    open_files_modal = () => {
        this.setState({ show_files_modal: true });
    }

    open_images_modal = () => {
        this.setState({ show_images_modal: true });
    }

    close_images_modal = () => {
        this.setState({ show_images_modal: false });
    }

    fileUploadHandler = (topic_id, name, filename, url, type) => {
        this.setState({ show_images_modal: false, show_files_modal: false });
        axios.post('https://notes-app-ad40a.firebaseio.com/users/' + this.props.user.uid + '/topics/' + String(topic_id) + '/' + type + '.json', {
            name: name,
            filename: filename,
            url: url,
        })
            .then((response) => {
                console.log(response);
                this.getTopics();
            })
            .catch((errors) => console.log(errors));
    }

    render() {
        return (
            !(this.props.user) ? <Redirect to="/login" /> :
                <div className="container mt-3 mb-3">
                    <Grid fluid={true}>
                        <Row>
                            <Col xs={6}>
                                <Sidebar
                                    topics_loading={this.state.topics_loading}
                                    open_topic_modal={this.open_topic_modal}
                                    close_topic_modal={this.close_topic_modal}
                                    addTopic={this.addTopic}
                                    show_topic_modal={this.state.show_topic_modal}
                                    topics={this.state.topics}
                                    click={this.topicSelectHandler}
                                    logout={this.props.logout}
                                />
                            </Col>
                            <Col xs={18}>
                                <Container>
                                    <Content>
                                        <Switch>
                                            <Route
                                                path="/topics/:id"
                                                component={routerProps => {
                                                    return (this.state.topics_loading || !(this.state.topics) ?
                                                        <Panel bordered className="text-center"><Loader speed="fast" /></Panel> :
                                                        <TopicPanel
                                                            topic={
                                                                this.state.topics[routerProps.match.params.id]
                                                            }
                                                            topics_loading={this.state.topics_loading}
                                                            submitLink={this.linkSubmitHandler}
                                                            open_link_modal={this.open_link_modal}
                                                            close_link_modal={this.close_link_modal}
                                                            show_link_modal={this.state.show_link_modal}
                                                            open_images_modal={this.open_images_modal}
                                                            close_images_modal={this.close_images_modal}
                                                            show_images_modal={this.state.show_images_modal}
                                                            open_files_modal={this.open_files_modal}
                                                            close_files_modal={this.close_files_modal}
                                                            show_files_modal={this.state.show_files_modal}
                                                            submitFile={this.fileUploadHandler}
                                                            selected_id={this.state.selected_id}
                                                            deleteEntry={this.deleteEntryHandler}
                                                            show_delete_modal={this.state.show_delete_modal}
                                                            open_delete_modal={this.open_delete_modal}
                                                            close_delete_modal={this.close_delete_modal}
                                                            show_notes_modal={this.state.show_notes_modal}
                                                            open_notes_modal={this.open_notes_modal}
                                                            close_notes_modal={this.close_notes_modal}
                                                            submitNote={this.noteSubmitHandler}
                                                        />);
                                                }}
                                            />
                                            <Route path="/">
                                                <HomePanel first_name={this.state.first_name} topics={this.state.topics} />
                                            </Route>
                                        </Switch>
                                    </Content>
                                </Container>
                            </Col>
                        </Row>
                    </Grid>
                </div>


        )
    }
}

export default MainContainer;