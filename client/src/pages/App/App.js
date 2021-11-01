import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { EditorPage, ErrorPage, HomePage } from "../";
import { UserPage } from "../User/UserPage";
import { UserProvider } from "../../contexts/UserContext";
import { Header } from "./Header";
import { EditUserPage } from "../User/EditUserPage";
import { Footer } from "../../components/common/Footer";
import { GlobalContainer } from "../../components/ui/GlobalContainer";
import { Signup, Login, Protected, ForgotPassword } from "../Auth";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <GlobalContainer>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Protected exact path="/user/:userId" component={UserPage} />
            <Protected path="/user/:userId/edit" component={EditUserPage} />
            <Protected path="/editor/:siteId" component={EditorPage} />
            <Route component={ErrorPage} />
          </Switch>
          <Footer></Footer>
        </GlobalContainer>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
