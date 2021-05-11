import React from "react";
import axios from "axios";
import EditForm from "./editForm";

import { Container, Card, Button, Typography } from "@material-ui/core";

type ColumnCard = {
  _id: number;
  title: string;
  description: string;
  boardId: number;
};

//I know I shouldn't set the type to any but what do I set it as?
interface Props {
  column: string;
  cards: ColumnCard[];
  refreshBoard(boardId: number): Promise<void>;
}

function Column(props: Props) {
  const { column, cards } = props;
  // const taskList = ['Backlog', 'ToDo', 'Doing', 'Done']
  const erase = async (id: string | number | null | undefined, boardId: number): Promise<void> => {
    await axios.delete(`http://localhost:3001/api/boards/${boardId}/cards/${id}`);
    await props.refreshBoard(boardId);
  };

  const onDragStart = (
    e: { dataTransfer: { setData: (arg0: string, arg1: any) => void } },
    cardTitle: React.ReactNode,
    cardId: string | number,
    cardDescription: React.ReactNode
  ) => {
    e.dataTransfer.setData("cardTitle", cardTitle);
    e.dataTransfer.setData("cardId", cardId);
    e.dataTransfer.setData("cardDescription", cardDescription);
  };

  return (
    <Container>
      {cards.map((card: { _id: string | number; title: React.ReactNode; boardId: number; description: string }) => {
        return (
          <Card
            style={{ margin: "15px", padding: "10px 0", cursor: "pointer" }}
            variant="outlined"
            key={card._id}
            draggable
            onDragStart={(e: any) => {
              onDragStart(e, card.title, card._id, card.description);
            }}
          >
            <Typography variant="subtitle1" style={{ margin: "0 10px" }}>
              {card.title}
            </Typography>
            <Typography variant="subtitle1" style={{ margin: "0 10px" }}>
              {card.description}
            </Typography>
            <Button
              color="secondary"
              size="small"
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                erase(card._id, card.boardId);
              }}
            >
              Delete
            </Button>
            <EditForm id={card._id} boardId={card.boardId} column={props.column} refreshBoard={props.refreshBoard} />
          </Card>
        );
      })}
    </Container>
  );
}

export default Column;
