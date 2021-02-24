import React, { useState, useEffect } from "react";
import Column from "./column";
import axios from "axios";
import ModalForm from "./modalForm";
import { Container, Grid, Paper } from "@material-ui/core";

type ColumnCard = {
  id: number;
  column: string;
  title: string;
};

function Board() {
  const [backlogColumnData, setBacklogColumnData] = useState([]);
  const [toDoColumnData, setToDoColumnData] = useState([]);
  const [doingColumnData, setDoingColumnData] = useState([]);
  const [doneColumnData, setDoneColumnData] = useState([]);

  const getCards = async (boardId: number): Promise<any> => {
    const response = await axios.get(`http://localhost:3001/api/board/${boardId}/cards`);
    return response.data;
  };

  const setCardsState = (cards: any): void => {
    setBacklogColumnData(cards.filter((card: ColumnCard) => card.column.toUpperCase() === "BACKLOG"));
    setToDoColumnData(cards.filter((card: ColumnCard) => card.column.toUpperCase() === "TODO"));
    setDoingColumnData(cards.filter((card: ColumnCard) => card.column.toUpperCase() === "DOING"));
    setDoneColumnData(cards.filter((card: ColumnCard) => card.column.toUpperCase() === "DONE"));
  };

  const refreshBoard = async (boardId: number): Promise<void> => {
    const cards = await getCards(boardId);
    setCardsState(cards);
  };

  useEffect(() => {
    const fetchData = async () => {
      await refreshBoard(1);
    };
    fetchData();
  }, []);

  const backlog = "Backlog";
  const toDo = "ToDo";
  const doing = "Doing";
  const done = "Done";

  const onDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = async (e: any, columnDropName: string) => {
    const cardId = e.dataTransfer.getData("cardId");
    await axios.put(`http://localhost:3001/api/board/1/${cardId}`, { column: columnDropName });
    await refreshBoard(1);
  };
  return (
    <Container>
      <Paper>
        <Grid container spacing={3}>
          <Grid item xs={3} onDragOver={(e: any) => onDragOver(e)} onDrop={(e: any) => onDrop(e, backlog)}>
            <h2>Backlog</h2>
            <Column column={backlog} cards={backlogColumnData} refreshBoard={refreshBoard} />
            <ModalForm column={backlog} refreshBoard={refreshBoard} />
          </Grid>
          <Grid item xs={3} onDragOver={(e: any) => onDragOver(e)} onDrop={(e: any) => onDrop(e, toDo)}>
            <h2>ToDo</h2>
            <Column column={toDo} cards={toDoColumnData} refreshBoard={refreshBoard} />
            <ModalForm column={toDo} refreshBoard={refreshBoard} />
          </Grid>
          <Grid item xs={3} onDragOver={(e: any) => onDragOver(e)} onDrop={(e: any) => onDrop(e, doing)}>
            <h2>Doing</h2>
            <Column column={doing} cards={doingColumnData} refreshBoard={refreshBoard} />
            <ModalForm column={doing} refreshBoard={refreshBoard} />
          </Grid>
          <Grid item xs={3} onDragOver={(e: any) => onDragOver(e)} onDrop={(e: any) => onDrop(e, done)}>
            <h2>Done</h2>
            <Column column={done} cards={doneColumnData} refreshBoard={refreshBoard} />
            <ModalForm column={done} refreshBoard={refreshBoard} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Board;
