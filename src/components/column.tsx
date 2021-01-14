import React, {useEffect, useState}from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import PropTypes from 'prop-types'

Column.propTypes = {
    column: PropTypes.string,
    cards: PropTypes.array
}
function Column(props: any) {
    const taskList = ['Backlog', 'ToDo', 'Doing', 'Done']
    const [cardData, setCardData] = useState([])
    const erase = () => {console.log(`delete the ${props.cards.title}`)}
    const add = () => {console.log(`add a card to ${props.column}`)}
    const columnSelect = (e: any) => {console.log(e.target.value)}

        useEffect( ()=>{
         const fetchData = async () => {
             const response = await axios.get('http://localhost:3001/api/board/1')
             setCardData(response.data.cards)
         }
         fetchData()
    }, [])

    //filter here 
    const filteredCards = cardData.filter((cards) => cards["column"] === props.column);

    return (
        <Container>
            {filteredCards.map((card: { id: string | number | null | undefined; title: React.ReactNode; }) => {
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