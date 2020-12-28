import React, { Component } from 'react';
import { Link, generatePath } from 'react-router-dom';

export default class CheckEligibilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: '',
        firstName: '',
        lastName: '',
        dob: '',
        employeeStatus: undefined,
        annualIncome: undefined,
        address: '',
      },
    };
  }

  onClickSubmit(e) {
    e.preventDefault();
    console.log('submit form');
    fetch('http://localhost:3001/cardlist', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Alice' }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <form onSubmit={(e) => this.onClickSubmit(e)}>
        <div>
          <label>
            Title <select></select>
          </label>
        </div>

        <div>
          <label>
            First name
            <input />
          </label>
        </div>

        <div>
          <label>
            Last name
            <input />
          </label>
        </div>

        <div>
          <label>
            Date Of Birth
            <input />
          </label>
        </div>

        <div>
          <label>
            What is your employee status?
            <select></select>
          </label>
        </div>

        <div>
          <label>
            How much is your annual income?
            <input />
          </label>
        </div>

        <div>
          <label>
            Your address
            <input />
          </label>
        </div>

        <div>
          <Link
            to={generatePath(
              '/cardlist/employee_status=:status&income_range=:income',
              {
                status: 'student',
                income: 1000,
              }
            )}
          >
            <button type="submit">Get my credit scores</button>
          </Link>
        </div>
      </form>
    );
  }
}
