import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button, Box } from "@material-ui/core";
import AddBoardModal from "./addBoardModal";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function BoardSelect(props?: any) {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          flexWrap="wrap"
          flexDirection="row"
          alignItems="center"
          style={{ width: "80%", margin: "auto" }}
        >
          {props.boards.map((board: { _id: string; title: any }) => {
            const link = `boards/${board._id}`;
            return (
              <ul key={board._id}>
                <Button component={RouterLink} to={link} variant="contained">
                  {board.title}
                </Button>
              </ul>
            );
          })}
        </Box>
      </ThemeProvider>
      <AddBoardModal refreshBoardList={props.refreshBoardList} />
    </div>
  );
}

export default BoardSelect;
