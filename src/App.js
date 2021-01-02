import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.scss';

import CheckEligibility from 'pages/CheckEligibility';
import CardList from 'pages/CardList';
import CardDetails from 'pages/CardDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/check_eligibility" component={CheckEligibility} />

        <Route path="/cardlist" component={CardList} />

        <Route path="/card_details/:card_type" component={CardDetails} />

        <Redirect to="/check_eligibility" />
      </Switch>
    </Router>
  );
}

export default App;
