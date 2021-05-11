import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import BoardSelect from "./components/boardSelect";
import SingleBoardView from "./components/SingleBoardView";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

function App() {
  const classes = useStyles();
  const [boardList, setBoardList] = useState([]);

  const getBoards = async (): Promise<any> => {
    const response = await axios.get(`http://localhost:3001/api/boards`);
    return response.data;
  };

  const refreshBoardList = async (): Promise<void> => {
    const boards = await getBoards();
    setBoardList(boards);
  };

  useEffect(() => {
    const fetchData = async () => {
      await refreshBoardList();
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className={classes.root}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{ height: "100%", width: "100%", padding: "10px 30px", color: "white", backgroundColor: "#6E7E85" }}
        >
          <Typography>Trello Clone</Typography>
          <Button variant="text" color="primary">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Select A Board
            </Link>
          </Button>
        </Box>

        <Switch>
          <Route exact path="/">
            <BoardSelect boards={boardList} refreshBoardList={refreshBoardList} />
          </Route>
          <Route path="/boards/:id">
            <SingleBoardView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
