import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
  ButtonGroup,
  FormGroup,
  Theme,
  withStyles,
} from "@material-ui/core";

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText("#B7CECE"),
    borderColor: "#E2E2E2",
    backgroundColor: "#B7CECE",
    "&:hover": {
      borderColor: "#E2E2E2",
      backgroundColor: "#B7CECE",
    },
  },
}))(Button);

function ModalForm(props: any) {
  const [show, setShow] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const { id }: any = useParams();

  const handleClose = () => {
    setTitleValue("");
    setDescriptionValue("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const addCard = async () => {
    const newCard = {
      boardId: id,
      column: props.column,
      title: titleValue,
      description: descriptionValue,
    };
    await axios.post(`http://localhost:3001/api/boards/${id}/cards`, newCard);
    console.log("this was hit");
    await props.refreshBoard(id);
    handleClose();
  };

  return (
    <>
      <ButtonGroup color="secondary" size="small" onClick={handleShow}>
        <ColorButton>Add A Card</ColorButton>
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
