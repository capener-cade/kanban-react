import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import BoardSelect from "./components/boardSelect";
import SingleBoardView from "./components/SingleBoardView";
import { Button } from "@material-ui/core";

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
        <Button>
          <Link to="/">Select A Board</Link>
        </Button>
        <hr />

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
