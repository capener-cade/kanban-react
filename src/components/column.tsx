import React from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


function Column(props: any) {
    const taskList = ['Backlog', 'ToDo', 'Doing', 'Done']
    const erase = () => {console.log(`delete the ${props.cards.title}`)}
    const add = () => {console.log(`add a card to ${props.column}`)}
    const columnSelect = (e: any) => {console.log(e.target.value)}

    return (
        <Container>
            {props.cards.map((card: { id: string | number | null | undefined; title: React.ReactNode; }) => {
            return <Card key={card.id}>
                    <Card.Title>{card.title}</Card.Title>
                            <select  onChange={columnSelect}>
                                <option value="">Move To</option>
                                {taskList.map(column => <option key={column}>{column}</option>)}
                            </select>
                        <Container>
                            <Button size="sm" variant="outline-danger" onClick={erase}>Delete Card</Button>
                        </Container>
                    </Card>
            })}
        <Button onClick={add}>+</Button>
        </Container>
    );
}

export default Column;