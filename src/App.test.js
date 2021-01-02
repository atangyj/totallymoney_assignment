import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router, Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import App from './App';
import CardList from 'pages/CardList';

test('submit check eligiblility form should navigate to correct card list route', () => {
  const employeeStatus = 'student';
  const income = 1000;

  let history = createMemoryHistory();

  render(
    <Router history={history}>
      <App />
    </Router>
  );

  // action fill form
  act(() => {
    fireEvent.change(screen.getByTestId('select-title'), {
      target: { value: 'Mr' },
    });

    fireEvent.change(screen.getByTestId('input-fname'), {
      target: { value: 'foo' },
    });

    fireEvent.change(screen.getByTestId('input-lname'), {
      target: { value: 'bar' },
    });

    fireEvent.change(screen.getByTestId('select-employee-status'), {
      target: { value: employeeStatus },
    });

    fireEvent.change(screen.getByTestId('input-income'), {
      target: { value: income },
    });
  });

  fireEvent.click(screen.getByTestId('check-eligible-btn'));

  // assert about url
  expect(window.location.search).toBe(
    `?employee_status=${employeeStatus}&income_range=${income}`
  );
});

test('given a cardlist route should call api with correct params', () => {
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

  act(() => {
    render(
      <Router history={history}>
        <Route component={CardList} />
      </Router>
    );
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'http://localhost:3001/check-eligible?employee_status=ptime&income_range=10'
  );
});

test('give mock api response should render card list and show sum of selected credits', async () => {
  // mock api
  const mockSuccessResponse = {
    cardlist: [
      {
        card_type: 'anywhere_card',
        eligible_check: {},
        card_details: {
          name: 'test card one',
          key_facts: [],
          credit_score: 1000,
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
          credit_score: 2000,
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

  await act(async () => {
    render(
      <Router history={history}>
        <Route component={CardList} />
      </Router>
    );
  });

  // assert: render card list page
  expect(screen.getByTestId('page-header')).toHaveTextContent('Select Cards');
  expect(screen.getAllByTestId('card')).toHaveLength(2);
  const names = screen.getAllByTestId('card-name');
  expect(names[0].textContent).toBe('test card one');
  expect(names[1].textContent).toBe('test card two');

  // action: select two cards
  fireEvent.click(screen.getByTestId('cardlist-select-btn'));
  const btns = screen.getAllByTestId('card-select-btn');
  fireEvent.click(btns[0]);
  fireEvent.click(btns[1]);

  // assert: display total credits of selected cards
  expect(screen.getByTestId('card-total-credits').textContent).toBe('3000');

  // action: unselect a card
  fireEvent.click(btns[0]);

  // assert: display total credits of selected cards
  expect(screen.getByTestId('card-total-credits').textContent).toBe('2000');
});
