import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.scss';

import CheckEligibility from 'pages/CheckEligibility';
import EligibleCardList from 'pages/CardList';
import CardDetails from 'pages/CardDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/check_eligibility" />

        <Route exact path="/check_eligibility" component={CheckEligibility} />

        <Route
          exact
          path="/cardlist/employee_status=:status&income_range=:income"
          component={EligibleCardList}
        />

        <Route path="/card_details/:card_type" component={CardDetails} />
      </Switch>
    </Router>
  );
}

export default App;
