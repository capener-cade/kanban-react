import React, { useEffect, useState } from 'react';
import Column from './column'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const cards = [
    {
        "id":14,
        "column": "ToDo",
        "title": "Go Outside"
    },
    {
        "id":2,
        "column": "Doing",
        "title": "Run"
    },
    {
        "id":1,
        "column": "Done",
        "title": "Lift"
    },
    {
        "id":12,
        "column": "Done",
        "title": "Walk"
    }
]



function Board() {
    const [cardData, setCardData] = useState(cards)

    useEffect( ()=>{
         const fetchData = async () => {
             const response = await axios.get('http://localhost:3001/api/board/1')
             setCardData(response.data.cards)
         }
         fetchData()
    }, [])
 
    const backlogData = cardData.filter((currentValue, index, array) => {
        console.log(cardData)
        return currentValue.column === "Backlog"
    })
    const toDoData = cardData.filter((currentValue, index, array) => {
        return currentValue.column === "ToDo"
    })
    const doingData = cardData.filter((currentValue, index, array) => {
        return currentValue.column === "Doing"
    })
    const doneData = cardData.filter((currentValue, index, array) => {
        return currentValue.column === "Done"
    })

    return (
        <Container>
            <Row>
                <Col>
                <h2>Backlog</h2>
                <Column column={"Backlog"} cards={backlogData}/>
                </Col>
                <Col>
                <h2>ToDo</h2>
                <Column column={"ToDo"} cards={toDoData}/>
                </Col>
                <Col>
                <h2>Doing</h2>
                <Column column={"Doing"} cards={doingData}/>
                </Col>
                <Col>
                <h2>Done</h2>
                <Column column={"Done"} cards={doneData}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Board;