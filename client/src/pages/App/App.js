import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import "./App.css";

import { GlobalContainer } from "../../components";
import { EditorPage, ErrorPage, HomePage } from "../";
import { LoginPage } from "../User/LoginPage";
import { SignupPage } from "../User/SignupPage";
import { ProtectedRoute } from "../Auth/ProtectedRoute";
import { UserPage } from "../User/UserPage";
import { UserProvider } from "../../contexts/UserContext";
import { Header } from "./Header";

const Footer = styled.div``;

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <GlobalContainer>
          <Header></Header>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/login"
              render={(props) => <LoginPage {...props}></LoginPage>}
            />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/user/:userId" component={UserPage} />
            <ProtectedRoute path="/editor/:siteId" component={EditorPage} />
            <Route component={ErrorPage} />
          </Switch>
          <Footer></Footer>
        </GlobalContainer>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
