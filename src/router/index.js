import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CheckEligibilityForm from 'pages/CheckEligibilityForm';
import EligibleCardList from 'pages/EligibleCardList';
import CardDetails from 'pages/CardDetails';

export default function TotallyMoneyRouter() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/check_eligibility"
          component={CheckEligibilityForm}
        />

        <Route
          exact
          path="/cardlist/employee_status=:status&income_range=:income"
          component={EligibleCardList}
        />

        <Route
          path="/card_details/:card_type"
          render={(props) => <CardDetails {...props} />}
        />
      </Switch>
    </Router>
  );
}
