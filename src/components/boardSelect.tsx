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
        <div style={{ margin: "100px" }}>
          {/* <AppBar style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Typography style={{ paddingLeft: "50px", height: "100%", margin: "20px 0" }} variant="h5">
                Trello Clone
              </Typography>
            </AppBar> */}
        </div>
        {props.boards.map((board: { _id: string; title: any }) => {
          const link = `boards/${board._id}`;
          return (
            <ul key={board._id}>
              <Button component={RouterLink} to={link} variant="contained" color="primary">
                {board.title}
                {console.log(board.title)}
              </Button>
            </ul>
          );
        })}
      </ThemeProvider>
    </div>
  );
}

export default BoardSelect;
