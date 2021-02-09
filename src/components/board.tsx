import React, {useState, useEffect} from 'react';
import Column from './column'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ModalForm from './modalForm'



type ColumnCard = {
    id: number;
    column: string;
    title: string;
}

function Board() {
//TODO: remve the move to drop down for now
const [cardData, setCardData] = useState([])
const [backlogColumnData, setBacklogColumnData] = useState([])
const [toDoColumnData, setToDoColumnData] = useState([])
const [doingColumnData, setDoingColumnData] = useState([])
const [doneColumnData, setDoneColumnData] = useState([])

const getCards = async (boardId: number): Promise<any> => {
    const response = await axios.get(`http://localhost:3001/api/board/${boardId}/cards`)
    return response.data
}

const setCardsState = (cards: any): void => {
    setCardData(cards)
    setBacklogColumnData(cards.filter((card: ColumnCard) => card.column.toUpperCase() === "BACKLOG"));
    setToDoColumnData(cards.filter((card: ColumnCard) => card.column.toUpperCase() === "TODO"));
    setDoingColumnData(cards.filter((card: ColumnCard) => card.column.toUpperCase() === "DOING"));
    setDoneColumnData(cards.filter((card: ColumnCard) => card.column.toUpperCase() === "DONE"));
}

const refreshBoard = async(boardId: number): Promise<void> => {
    const cards = await getCards(boardId);
    setCardsState(cards);
}

useEffect( ()=>{
    const fetchData = async () => {
        await refreshBoard(1);
    }
    fetchData()
}, [])

const backlog = "Backlog"
const toDo = "ToDo"
const doing = "Doing"
const done = "Done"

    return (
        <Container>
            <Row>
                <Col>
                <h2>Backlog</h2>
                <Column column={backlog} cards={backlogColumnData} refreshBoard={refreshBoard}/>
                <ModalForm column={backlog} refreshBoard={refreshBoard}/>
                </Col>
                <Col>
                <h2>ToDo</h2>
                <Column column={toDo} cards={toDoColumnData} refreshBoard={refreshBoard}/>
                <ModalForm column={toDo} refreshBoard={refreshBoard}/>
                </Col>
                <Col>
                <h2>Doing</h2>
                <Column column={doing} cards={doingColumnData} refreshBoard={refreshBoard}/>
                <ModalForm column={doing} refreshBoard={refreshBoard}/>
                </Col>
                <Col>
                <h2>Done</h2>
                <Column column={done} cards={doneColumnData} refreshBoard={refreshBoard}/>
                <ModalForm column={done} refreshBoard={refreshBoard}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Board;