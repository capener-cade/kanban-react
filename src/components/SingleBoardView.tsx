import React from "react";
import { BrowserRouter as Link, useParams } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Board from "./board";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function SingleBoardView() {
  const { id }: any = useParams();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div style={{ margin: "100px" }}></div>
        <Board />
      </ThemeProvider>
    </div>
  );
}
export default SingleBoardView;
