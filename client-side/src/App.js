import logo from './logo.svg';
import './App.css';
import { MainTable } from './views'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from './routes';


import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";

const MainViewContainer = styled.div.attrs({
  className: 'main-view-container'
})`
  padding: 0% 10%;
  /* max-height: 100vh; */
`;

class App extends Component {
  render() {
    const publicViews = (
      <Switch>
        <Route exact path={routes.HOME} component = {MainTable}></Route>
      </Switch>


    );
    return (
      <Router>
        <MainViewContainer>
          {publicViews}
        </MainViewContainer>
      </Router>
    )

  }

}

export default App;