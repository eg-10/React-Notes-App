import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Panel, PanelGroup, Divider, Button, Icon } from 'rsuite';
import DeleteModal from './DeleteModal';
import LinkModal from './LinkModal'
import NoteModal from './NoteModal';
import UploadModal from './UploadModal';

class TopicPanel extends Component {

    render() {

        let notes = null;
        if (this.props.topic.notes) {
            notes = [];
            for (const entry in this.props.topic.notes) {
                notes.push(

                    {
                        id: entry,
                        name: this.props.topic.notes[entry].name,
                        content: this.props.topic.notes[entry].content,
                    }
                )
            }
        }

        let links = null;
        if (this.props.topic.links) {
            links = [];
            for (const entry in this.props.topic.links) {
                links.push(

                    {
                        id: entry,
                        name: this.props.topic.links[entry].name,
                        link: this.props.topic.links[entry].link,
                    }
                )
            }
        }

        let images = null;
        if (this.props.topic.images) {
            images = [];
            for (const entry in this.props.topic.images) {
                images.push(

                    {
                        id: entry,
                        filename: this.props.topic.images[entry].filename,
                        name: this.props.topic.images[entry].name,
                        url: this.props.topic.images[entry].url,
                    }
                )
            }
        }

        let files = null;
        if (this.props.topic.files) {
            files = [];
            for (const entry in this.props.topic.files) {
                files.push(

                    {
                        id: entry,
                        name: this.props.topic.files[entry].name,
                        filename: this.props.topic.files[entry].filename,
                        url: this.props.topic.files[entry].url,
                    }
                )
            }
        }

        return (
            !(this.props.topic) ? <Redirect to="/" /> :
                <Panel bordered>
                    <h2>{this.props.topic ? this.props.topic.name : null}</h2>
                    <Divider />
                    <PanelGroup accordion>
                        <Panel header={<h4><Icon icon="book" className="mr-3" /> Notes</h4>} defaultExpanded>
                            <Button onClick={() => this.props.open_notes_modal('')} appearance="primary" className="float-right"><Icon icon="plus" className="mr-3" />Add Note</Button>
                            <br /><br /><br />
                            <NoteModal
                                show={this.props.show_notes_modal && !(this.props.selected_id)}
                                close={this.props.close_notes_modal}
                                submit={(name, content) => this.props.submitNote(this.props.topic.id, name, content)}
                            />
                            {
                                notes ?
                                    notes.map(note => {
                                        return (
                                            <div key={note.id}>
                                            <Panel className="mb-1" key={note.id} bordered style={{ backgroundColor: "#1a1d24" }}>
                                                    <Button onClick={() => this.props.open_delete_modal(note.id)} appearance="subtle" className="float-right" >
                                                        <Icon icon="close" className="float-right" />
                                                    </Button>
                                                    <DeleteModal
                                                        show={this.props.show_delete_modal && this.props.selected_id === note.id}
                                                        close={this.props.close_delete_modal}
                                                        name={note.name}
                                                        delete={() => this.props.deleteEntry(this.props.topic.id, "notes", note.id)}
                                                    />
                                                    <Link to="#" className="text-white text-decoration-none" onClick={() => this.props.open_notes_modal(note.id)} >
                                                        <h5>
                                                            {
                                                                note.name.length > 75 ?
                                                                    note.name.slice(0, 75) + "..." :
                                                                    note.name
                                                            }
                                                        </h5>
                                                        <p>
                                                            {
                                                                note.content.length > 100 ?
                                                                    note.content.slice(0, 100) + "..." :
                                                                    note.content
                                                            }
                                                        </p>
                                                    </Link>
                                                </Panel>
                                                <NoteModal
                                                    note={note}
                                                    show={this.props.show_notes_modal && this.props.selected_id === note.id}
                                                    close={this.props.close_notes_modal}
                                                    submit={(name, content) => this.props.submitNote(this.props.topic.id, name, content, note.id)}
                                                />
                                            </div>
                                        )
                                    })
                                    : <Panel><p className="text-center">You haven't added any notes yet!</p></Panel>
                            }
                        </Panel>
                        <Panel header={<h4><Icon icon="link" className="mr-3" /> Links</h4>} defaultExpanded>
                            <Button onClick={this.props.open_link_modal} appearance="primary" className="float-right"><Icon icon="plus" className="mr-3" />Add Link</Button>
                            <br /><br /><br />
                            <LinkModal
                                show={this.props.show_link_modal}
                                close={this.props.close_link_modal}
                                submit={(name, link) => this.props.submitLink(this.props.topic.id, name, link)}
                            />
                            {
                                links ?
                                    links.map(link => {
                                        return (
                                            <Panel className="mb-1" key={link.id} bordered style={{ backgroundColor: "#1a1d24" }}>
                                                <Button onClick={() => this.props.open_delete_modal(link.id)} appearance="subtle" className="float-right" >
                                                    <Icon icon="close" className="float-right" />
                                                </Button>
                                                <DeleteModal
                                                    show={this.props.show_delete_modal && this.props.selected_id === link.id}
                                                    close={this.props.close_delete_modal}
                                                    name={link.name}
                                                    delete={() => this.props.deleteEntry(this.props.topic.id, "links", link.id)}
                                                />
                                                <h5>{link.name}</h5>
                                                <p>Link: <a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a></p>
                                            </Panel>
                                        )
                                    })
                                    : <Panel><p className="text-center">You haven't added any links yet!</p></Panel>
                            }
                        </Panel>
                        <Panel header={<h4><Icon icon="image" className="mr-3" /> Images</h4>} defaultExpanded>
                            <Button onClick={this.props.open_images_modal} appearance="primary" className="float-right"><Icon icon="plus" className="mr-3" />Add Image</Button>
                            <UploadModal
                                title="Image"
                                show={this.props.show_images_modal}
                                close={this.props.close_images_modal}
                                submitFile={
                                    (name, filename, url) => this.props.submitFile(this.props.topic.id, name, filename, url, "images")
                                }
                            />
                            <br /><br /><br />
                            <div className="text-center">
                                {
                                    images ?
                                        images.map(image => {
                                            return (
                                                <Panel
                                                    className="m-2"
                                                    shaded bordered
                                                    bodyFill
                                                    style={{ display: 'inline-block', width: 220, backgroundColor: "#1a1d24" }}
                                                    key={image.id}>
                                                    <p className="text-right m-1"><Button onClick={() => this.props.open_delete_modal(image.id)} appearance="subtle" size="xs"><Icon icon="close" className="float-right" /></Button></p>
                                                    <DeleteModal
                                                        show={this.props.show_delete_modal && this.props.selected_id === image.id}
                                                        close={this.props.close_delete_modal}
                                                        name={image.name}
                                                        delete={() => this.props.deleteEntry(this.props.topic.id, "images", image.id, image.filename)}
                                                    />
                                                    <a className="text-decoration-none" href={image.url} target="_blank" rel="noopener noreferrer">
                                                        <Panel>
                                                            <h5>{image.name}</h5>
                                                        </Panel>
                                                        <img src={image.url} height="200" alt={image.name} />
                                                    </a>
                                                </Panel>
                                            )
                                        })
                                        : <Panel><p>You haven't added any images yet!</p></Panel>
                                }
                            </div>
                        </Panel>
                        <Panel header={<h4><Icon icon="file-text-o" className="mr-3" /> Files</h4>} defaultExpanded>
                            <Button onClick={this.props.open_files_modal} appearance="primary" className="float-right"><Icon icon="plus" className="mr-3" />Add File</Button>
                            <UploadModal
                                title="File"
                                show={this.props.show_files_modal}
                                close={this.props.close_files_modal}
                                submitFile={
                                    (name, filename, url) => this.props.submitFile(this.props.topic.id, name, filename, url, "files")
                                }
                            />
                            <br /><br /><br />
                            <div className="text-center">
                                {
                                    files ?
                                        files.map(file => {
                                            return (
                                                <Panel className="m-2" shaded bordered bodyFill style={{ display: 'inline-block', width: 220, backgroundColor: "#1a1d24" }} key={file.id}>
                                                    <p className="text-right m-1"><Button onClick={() => this.props.open_delete_modal(file.id)} appearance="subtle" size="xs"><Icon icon="close" className="float-right" /></Button></p>
                                                    <DeleteModal
                                                        show={this.props.show_delete_modal && this.props.selected_id === file.id}
                                                        close={this.props.close_delete_modal}
                                                        name={file.name}
                                                        delete={() => this.props.deleteEntry(this.props.topic.id, "files", file.id, file.filename)}
                                                    />
                                                    <a className="text-decoration-none" href={file.url} target="_blank" rel="noopener noreferrer">
                                                        <div className="text-white pt-2 pb-2">
                                                            <h5>{file.name}</h5>
                                                            <br />
                                                            {file.filename.slice(0,5)}...{file.filename.slice(-15)}
                                                        </div>
                                                    </a>
                                                </Panel>
                                            )
                                        })
                                        : <Panel><p>You haven't added any files yet!</p></Panel>
                                }
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
        )
    }
}

export default TopicPanel;