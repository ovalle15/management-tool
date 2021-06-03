// import logo from './logo.svg';
import './App.css';
import { LoginPage, MainTable, RegisterPage, ReviewPage, LandingPage, DashboardTemp } from './views'
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
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    const publicViews = (
      <Switch>
        <PrivateRoute exact path={routes.HOME} component = {MainTable}></PrivateRoute>
        <PrivateRoute exact path={routes.REVIEW} component= {ReviewPage}></PrivateRoute>
        <Route exact path={routes.LANDING} component= {LandingPage}></Route>
        <Route exact path={routes.LOGIN} component={LoginPage}></Route>
        <Route exact path={routes.REGISTER} component={RegisterPage}></Route>
        <PrivateRoute exact path={routes.DASHBOARD} component={DashboardTemp}></PrivateRoute>
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