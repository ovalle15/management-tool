// import logo from './logo.svg';
import './App.css';
import { LoginPage, MainTable, RegisterPage, ReviewPage, LandingPage, AdminPage } from './views'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/auth/PrivateRoute";
import store from "./store";

import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";



const MainViewContainer = styled.div.attrs({
  className: 'main-view-container'
})`
  padding: 0% 10%;
  /* max-height: 100vh; */
`;

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    const publicViews = (
      <Switch>
        <PrivateRoute exact path={routes.HOME} component = {MainTable}></PrivateRoute>
        <PrivateRoute exact path={routes.REVIEW} component= {ReviewPage}></PrivateRoute>
        <PrivateRoute exact path={routes.ADMIN} component={AdminPage}></PrivateRoute>
        <Route exact path={routes.LANDING} component= {LandingPage}></Route>
        <Route exact path={routes.LOGIN} component={LoginPage}></Route>
        <Route exact path={routes.REGISTER} component={RegisterPage}></Route>
      </Switch>
    );
    return (
      <Provider store={store}>
        <Router>
          <MainViewContainer>
            {publicViews}
          </MainViewContainer>
        </Router>
      </Provider>
    )

  }

}

export default App;