import React from "react";
import { useParams } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Board from "./board";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const SingleBoardView: React.FC = () => {
  const { id }: any = useParams();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div style={{ margin: "100px" }}></div>
        <Board />
      </ThemeProvider>
    </div>
  );
};
export default SingleBoardView;
