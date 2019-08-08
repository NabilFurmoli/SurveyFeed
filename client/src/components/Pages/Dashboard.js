
import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Dashboard extends Component {


    render () {
        return (
            <div className="fixed-action-btn">
                <Link to="/surveys/new">
                    <Button color='teal' content='Create New Survey' icon='add' labelPosition='left' floated="right" />
                </Link>
                
            </div>
        );
    }
}

export default Dashboard;

