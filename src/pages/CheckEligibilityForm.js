import React, { Component } from 'react';

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

  render() {
    return (
      <form>
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
      </form>
    );
  }
}
