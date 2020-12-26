import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CheckEligibilityForm from 'pages/CheckEligibilityForm';
import EligibleCardList from 'pages/EligibleCardList';
import CardDetails from 'pages/EligibleCardList';

export default function TotallyMoneyRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/check_eligibility">
          <CheckEligibilityForm />
        </Route>

        <Route path="/eligible_cards">
          <EligibleCardList />
        </Route>

        <Route path="/card_details">
          <CardDetails />
        </Route>
      </Switch>
    </Router>
  );
}
