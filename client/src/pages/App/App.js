import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import { GlobalContainer } from "../../components";
import { EditorPage, ErrorPage, HomePage } from "../";

function App() {
  return (
    <BrowserRouter>
      <GlobalContainer>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/editor/:pageId" component={EditorPage} />
          <Route component={ErrorPage} />
        </Switch>
      </GlobalContainer>
    </BrowserRouter>
  );
}

export default App;
