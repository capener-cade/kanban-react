import React, {useState, useEffect} from 'react';
import Column from './column'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'



type ColumnCard = {
    id: number;
    column: string;
    title: string;
}

function Board() {
//TODO: add a "Create Card" button here.  All it needs to do is create a new card for the backlog column and add to the array and set the state
//TODO: remve the move to drop down for now
//TODO: get all the card here.  push them into a state for each column, pass the specific array down to the column
const [cardData, setCardData] = useState([])
const [backlogColumnData, setBacklogColumnData] = useState([])
const [toDoColumnData, setToDoColumnData] = useState([])
const [doingColumnData, setDoingColumnData] = useState([])
const [doneColumnData, setDoneColumnData] = useState([])

const addCard = () => {
    const newCard = {
            "boardId":1,
            "column": "Backlog",
            "title": "Add a New Card"
    }
    axios.post('http://localhost:3001/api/board/1/cards', newCard)
}

useEffect( ()=>{
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/api/board/1/cards')
        setCardData(response.data)
        setBacklogColumnData(response.data.filter((card: ColumnCard) => card.column.toUpperCase() === "BACKLOG"));
        setToDoColumnData(response.data.filter((card: ColumnCard) => card.column.toUpperCase() === "TODO"));
        setDoingColumnData(response.data.filter((card: ColumnCard) => card.column.toUpperCase() === "DOING"));
        setDoneColumnData(response.data.filter((card: ColumnCard) => card.column.toUpperCase() === "DONE"));
    }
    fetchData()
}, [])

    return (
        <Container>
            <Row>
                <Col>
                <h2>Backlog</h2>
                <Column column={"Backlog"} cards={backlogColumnData}/>
                <Button onClick={addCard}>Create A Card</Button>
                </Col>
                <Col>
                <h2>ToDo</h2>
                <Column column={"ToDo"} cards={toDoColumnData}/>
                </Col>
                <Col>
                <h2>Doing</h2>
                <Column column={"Doing"} cards={doingColumnData}/>
                </Col>
                <Col>
                <h2>Done</h2>
                <Column column={"Done"} cards={doneColumnData}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Board;