import React from "react";
import { Row, Col } from 'reactstrap';

import Sidebar from './sidebar.js'

class Body extends React.Component {
    render() {
        return (
            <Row>
                <Col xs="8" className={'main'}>Main</Col>
                <Col xs="4" className={'sidebar'}>
                    <Sidebar data={this.props.data}/>
                </Col>
            </Row>
        );
    }
}

export default Body;