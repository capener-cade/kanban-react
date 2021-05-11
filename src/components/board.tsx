import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Column from "./column";
import axios from "axios";
import ModalForm from "./modalForm";
import { Container, Grid, Paper, Box } from "@material-ui/core";

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

  const { id }: any = useParams();

  const getCards = async (boardId: number): Promise<any> => {
    const response = await axios.get(`http://localhost:3001/api/boards/${boardId}/cards`);
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
      await refreshBoard(id);
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
    const cardTitle = e.dataTransfer.getData("cardTitle");
    const cardDescription = e.dataTransfer.getData("cardDescription");
    await axios.put(`http://localhost:3001/api/boards/${id}/cards/${cardId}`, {
      title: cardTitle,
      column: columnDropName,
      description: cardDescription,
    });
    await refreshBoard(id);
  };
  return (
    <Container style={{ width: "80%" }}>
      <Paper>
        <Box display="flex" flexDirection="row" style={{ padding: "20px" }}>
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
        </Box>
      </Paper>
      <h3>Board Id: {id}</h3>
    </Container>
  );
}

export default Board;
