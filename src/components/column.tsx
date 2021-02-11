import React, {useEffect, useState}from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import PropTypes from 'prop-types'

type ColumnCard = {
    _id: number;
    title: string;
    boardId: number
}

interface Props {
    column: string;
    cards: ColumnCard[];
    refreshBoard(boardId: number): Promise<void>;
}

function Column(props: Props) {
    const {column, cards} = props;
    // const taskList = ['Backlog', 'ToDo', 'Doing', 'Done']
     const erase = async(id: string | number | null | undefined, boardId: number): Promise<void> =>  { 
         await axios.delete(`http://localhost:3001/api/board/${boardId}/${id}`);
         await props.refreshBoard(boardId);
      }

    return (
        <Container>
            {cards.map((card: { _id: string | number | null | undefined; title: React.ReactNode; boardId: number }) => {
            return <Card key={card._id}>
                    <Card.Title>{card.title}</Card.Title>
                        <Container>
                            <Button size="sm" variant="outline-danger" onClick={(event: React.MouseEvent<HTMLElement>) => {
                                erase(card._id, card.boardId)
                            }}>Delete</Button>
                        </Container>
                    </Card>
            })}
        </Container>
    );
}

export default Column;