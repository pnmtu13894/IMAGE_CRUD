import React, {Component} from 'react';
import {Row, Grid, Col, Jumbotron} from 'react-bootstrap';
import User from './user/User';
import Admin from './admin/Admin';


class Dashboard extends Component {



    render(){

        return(

            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col md={3}>
                            <Jumbotron>
                                <h2>{this.props.type=== 'user' ? 'User' : this.props.type === 'admin' ? 'Administrator' : null}</h2>
                                <img src={this.props.user.photoURL} className="img-responsive img-circle" style={{padding: 20}} />
                                <h4>Hello</h4>
                                <h3>{this.props.user.displayName}</h3>
                            </Jumbotron>
                        </Col>
                        <Col md={9}>
                            {this.props.type === 'user' ? (
                                <User/>
                            ) : this.props.type === 'admin' ? (
                                <Admin/>
                            ) : null
                            }
                        </Col>
                    </Row>
                </Grid>
            </div>

        );
    }

}

export default Dashboard;