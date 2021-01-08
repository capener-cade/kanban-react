import React from 'react';
import axios from 'axios'

function Column(props: any) {
    const taskList = ['Backlog', 'ToDo', 'Doing', 'Done']
    const erase = () => {console.log(`delete the ${props.cards.title}`)}
    const add = () => {console.log(`add a card to ${props.column}`)}
    const columnSelect = (e: any) => {console.log(e.target.value)}

    return (
        <div>
            {props.cards.map((card: { id: string | number | null | undefined; title: React.ReactNode; }) => {
        return <div key={card.id}>
            {card.title}
      <select  onChange={columnSelect}>
        <option value="">Move To</option>
        {taskList.map(column => <option key={column}>{column}</option>)}
      </select>
      <button onClick={erase}>X</button>
            </div>
    })}
        <button onClick={add}>+</button>
        </div>
    );
}

export default Column;