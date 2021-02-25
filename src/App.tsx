import React from 'react';
import './App.css';
import Board from './components/board'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#cfd8dc',
      dark: '#9ea7aa',
      contrastText: '#000000',
    },
    secondary: {
      light: '#718792',
      main: '#455a64',
      dark: '#1c313a',
      contrastText: '#ffffff',
    }
  }
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div style={{margin:"100px"}}>
        <AppBar style={{display:"flex", flexDirection:"row", alignItems:"center"}}> 
        <Typography style={{paddingLeft:"50px", height:"100%", margin:"20px 0"}}variant="h5">Trello Clone</Typography>
        </AppBar>
        </div>
      <Board/>
      </ThemeProvider>
    </div>
  );
}

export default App;
