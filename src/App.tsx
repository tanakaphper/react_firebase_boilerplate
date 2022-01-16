import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {MediaQueryProvider} from "./contexts/MediaQuery";
import {BrowserRouter} from "react-router-dom";
import RouteGroup from "./components/Routes/RouteGroup";
import {ThemeProvider} from "@mui/material/styles";
import {AuthProvider} from "./contexts/AuthProvider";
import theme from "./theme";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <MediaQueryProvider>
            <BrowserRouter>
              <Header />
              <RouteGroup/>
            </BrowserRouter>
          </MediaQueryProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
