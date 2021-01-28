import React, {useEffect, useState}from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import PropTypes from 'prop-types'

type ColumnCard = {
    id: number;
    title: string;
}

type Props = {
    column: string;
    cards: ColumnCard[];
}

function Column(props: Props) {
    const {column, cards} = props;
    // const taskList = ['Backlog', 'ToDo', 'Doing', 'Done']
    function erase(id: string | number | null | undefined) { console.log(`delete the ${id} card`); }

    return (
        <Container>
            {cards.map((card: { id: string | number | null | undefined; title: React.ReactNode; }) => {
            return <Card key={card.id}>
                    <Card.Title>{card.title}</Card.Title>
                        <Container>
                            <Button size="sm" variant="outline-danger" onClick={(event: React.MouseEvent<HTMLElement>) => {
                                erase(card.id)
                            }}>Delete Card</Button>
                        </Container>
                    </Card>
            })}
        </Container>
    );
}

export default Column;