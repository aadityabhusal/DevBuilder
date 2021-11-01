import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { EditorPage, ErrorPage, HomePage } from "../";
import { LoginPage } from "../User/LoginPage";
import { SignupPage } from "../User/SignupPage";
import { ProtectedRoute } from "../Auth/ProtectedRoute";
import { UserPage } from "../User/UserPage";
import { UserProvider } from "../../contexts/UserContext";
import { Header } from "./Header";
import { EditUserPage } from "../User/EditUserPage";
import { Footer } from "../../components/common/Footer";
import { GlobalContainer } from "../../components/ui/GlobalContainer";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <GlobalContainer>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/login"
              render={(props) => <LoginPage {...props}></LoginPage>}
            />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/user/:userId" component={UserPage} />
            <ProtectedRoute
              path="/user/:userId/edit"
              component={EditUserPage}
            />
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
