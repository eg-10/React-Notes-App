import React, { Component } from 'react';
import { Panel, Divider } from 'rsuite';

class HomePanel extends Component {
    render() {
        return (
            <Panel bordered>
                <h2>Welcome, {this.props.first_name}</h2>
                <Divider />
                {
                    this.props.topics ?
                        <p>You've added {Object.keys(this.props.topics).length} topic(s) so far!</p>
                        :
                        <p>You haven't added any topics yet!
                Add a topic using the sidebar now to get started!</p>
                }
            </Panel>
        )
    }
}

export default HomePanel;