import React, { useState, ReactText } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogTitle, TextField, Button, ButtonGroup, FormGroup } from "@material-ui/core";

interface Props {
  id: ReactText;
  boardId: number;
  column: string;
  refreshBoard(boardId: number): Promise<void>;
}

function EditForm(props: Props) {
  const [show, setShow] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleClose = () => {
    setTitleValue("");
    setDescriptionValue("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const updateCard = async (): Promise<void> => {
    const updatedCard = {
      title: titleValue,
      description: descriptionValue,
      column: props.column,
    };
    await axios.put(`http://localhost:3001/api/boards/${props.boardId}/cards/${props.id}`, updatedCard);
    await props.refreshBoard(props.boardId);
    handleClose();
  };

  return (
    <>
      <ButtonGroup color="primary" size="small" onClick={handleShow}>
        <Button>Edit</Button>
      </ButtonGroup>

      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Edit Card</DialogTitle>
        <DialogActions style={{ padding: "15px" }}>
          <FormGroup>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              type="title"
              label="New Title"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              type="description"
              label="New Description"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
          </FormGroup>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCard}>Edit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditForm;
