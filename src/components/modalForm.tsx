import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogTitle, TextField, Button, ButtonGroup, FormGroup } from "@material-ui/core";

function ModalForm(props: any) {
  const [show, setShow] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const addCard = async () => {
    const newCard = {
      boardId: 1,
      column: props.column,
      title: titleValue,
      description: descriptionValue,
    };
    await axios.post("http://localhost:3001/api/boards/1/cards", newCard);
    await props.refreshBoard(1);
    handleClose();
  };

  return (
    <>
      <ButtonGroup color="secondary" size="small" onClick={handleShow}>
        <Button>Add A Card</Button>
      </ButtonGroup>

      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Add A Card</DialogTitle>
        <DialogActions style={{ padding: "15px" }}>
          <FormGroup>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              type="title"
              label="Title"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              type="description"
              label="Description"
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
          </FormGroup>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={addCard}>Add Card</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalForm;
