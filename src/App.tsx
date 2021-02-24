import React from "react";
import "./App.css";
import Board from "./components/board";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div style={{ margin: "100px" }}>
          <AppBar style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Typography style={{ paddingLeft: "50px", height: "100%", margin: "20px 0" }} variant="h5">
              Trello Clone
            </Typography>
          </AppBar>
        </div>
        <Board />
      </ThemeProvider>
    </div>
  );
}

export default App;
