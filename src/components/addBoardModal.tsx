import React, { useState, ReactText } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
  ButtonGroup,
  FormGroup,
  withStyles,
  Theme,
} from "@material-ui/core";

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText("#6E7E85"),
    backgroundColor: "#6E7E85",
    "&:hover": {
      backgroundColor: "#B7CECE",
    },
  },
}))(Button);

function AddBoardModal(props: any) {
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
    const Board = {
      title: titleValue,
    };
    await axios.post(`http://localhost:3001/api/boards`, Board);
    props.refreshBoardList();
    handleClose();
  };

  return (
    <>
      <ButtonGroup color="primary" size="small" onClick={handleShow}>
        <ColorButton variant="outlined">Add Board</ColorButton>
      </ButtonGroup>

      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Add Board</DialogTitle>
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
          </FormGroup>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCard}>Add Board</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddBoardModal;
