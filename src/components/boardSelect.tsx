import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function BoardSelect(props?: any) {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div style={{ margin: "100px" }}></div>
        {props.boards.map((board: { _id: string; title: any }) => {
          const link = `boards/${board._id}`;
          return (
            <ul key={board._id}>
              <Button component={RouterLink} to={link} variant="contained" color="primary">
                {board.title}
              </Button>
            </ul>
          );
        })}
      </ThemeProvider>
    </div>
  );
}

export default BoardSelect;
