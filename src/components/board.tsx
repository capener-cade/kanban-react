import React from 'react';
import Column from './column'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Board() {


    return (
        <Container>
            <Row>
                <Col>
                <h2>Backlog</h2>
                <Column column={"Backlog"}/>
                </Col>
                <Col>
                <h2>ToDo</h2>
                <Column column={"ToDo"}/>
                </Col>
                <Col>
                <h2>Doing</h2>
                <Column column={"Doing"} />
                </Col>
                <Col>
                <h2>Done</h2>
                <Column column={"Done"}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Board;