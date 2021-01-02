import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import CardList from 'pages/CardList';

test('given a cardlist route should call check eligibility api', (done) => {
  const mockSuccessResponse = {
    cardlist: [],
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
  let history = createMemoryHistory();
  history.push('/cardlist?employee_status=ptime&income_range=10');

  render(
    <Router history={history}>
      <Route component={CardList} />
    </Router>
  );

  setTimeout(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/check-eligible?employee_status=ptime&income_range=10'
    );
    done();
  }, 20000);
});

test('give mock api response should render card list', (done) => {
  const mockSuccessResponse = {
    cardlist: [
      {
        card_type: 'anywhere_card',
        eligible_check: {},
        card_details: {
          name: 'test card one',
          key_facts: [],
          credit_score: 0,
        },
        card_features: ['feature one', 'feature two'],
        card_drawbacks: [],
        eligibility: [],
      },
      {
        card_type: 'anywhere_card',
        eligible_check: {},
        card_details: {
          name: 'test card two',
          key_facts: [],
          credit_score: 0,
        },
        card_features: ['feature one', 'feature two'],
        card_drawbacks: [],
        eligibility: [],
      },
    ],
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
  let history = createMemoryHistory();
  history.push('/cardlist?employee_status=ptime&income_range=10');

  render(
    <Router history={history}>
      <Route component={CardList} />
    </Router>
  );

  setTimeout(() => {
    expect(screen.getByTestId('page-header')).toHaveTextContent('Select Cards');
    expect(screen.getAllByTestId('card')).toHaveLength(2);
    const names = screen.getAllByTestId('card-name');
    expect(names[0].textContent).toBe('test card one');
    expect(names[1].textContent).toBe('test card two');

    done();
  }, 2000);
});

test('select cards should display total credits', (done) => {});
