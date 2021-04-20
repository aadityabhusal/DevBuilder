import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import "./App.css";

import { GlobalContainer } from "../../components";
import { EditorPage, ErrorPage, HomePage } from "../";
import { LoginPage } from "../User/LoginPage";
import { SignupPage } from "../User/SignupPage";
import styled from "styled-components";
import { ProtectedRoute } from "../Auth/ProtectedRoute";
import { UserPage } from "../User/UserPage";
import { useAuth } from "../Auth/useAuth";

const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  background-color: #34495e;
  color: #ecf0f1;

  & a {
    text-decoration: none;
    margin-left: 20px;
    color: #ecf0f1;
  }

  & a:hover {
    text-decoration: underline;
  }

  & .is-active {
    color: #00a8ff;
  }
`;

const Footer = styled.div``;

function App() {
  const { auth, loggedIn, setLoggedIn } = useAuth();

  const logout = async (e) => {
    await fetch(`/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <GlobalContainer>
        <Header>
          <div></div>
          <nav>
            <NavLink activeClassName="is-active" to="/" exact={true}>
              Home
            </NavLink>
            {loggedIn ? (
              <>
                <NavLink activeClassName="is-active" to={`/user/${auth._id}`}>
                  {`${auth.firstName} ${auth.lastName}`}
                </NavLink>
                <NavLink
                  activeClassName="is-active"
                  to="/login"
                  onClick={logout}
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink activeClassName="is-active" to="/login">
                  Login
                </NavLink>
                <NavLink activeClassName="is-active" to="/signup">
                  Signup
                </NavLink>
              </>
            )}
          </nav>
        </Header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/login"
            render={(props) => (
              <LoginPage {...props} setLoggedIn={setLoggedIn}></LoginPage>
            )}
          />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/user/:userId" component={UserPage} />
          <ProtectedRoute>
            <Route exact path="/editor/:pageId" component={EditorPage} />
          </ProtectedRoute>
          <Route component={ErrorPage} />
        </Switch>
        <Footer></Footer>
      </GlobalContainer>
    </BrowserRouter>
  );
}

export default App;
