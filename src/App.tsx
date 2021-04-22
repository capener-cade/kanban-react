import React, { useState, useEffect, Props } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import "./App.css";
import Board from "./components/board";
import axios from "axios";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import BoardSelect from "./components/boardSelect";
import SingleBoardView from "./components/SingleBoardView";
import Dashboard from "./components/Dashboard";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
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
      <div>
        <ul>
          <li>
            <Link to="/">Select A Board</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <BoardSelect boards={boardList} />
          </Route>
          <Route path="/boards/:id">
            <SingleBoardView />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
