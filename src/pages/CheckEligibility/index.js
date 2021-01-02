// Library
import React, { Component } from 'react';
import { generatePath } from 'react-router-dom';

// Components
import Page from 'components/elements/Page';
import Layout from 'components/elements/Layout';
import Form from 'components/elements/Form';
import Select from 'components/elements/Select';
import TextField from 'components/elements/TextField';
import Button from 'components/elements/Button';
import Header from 'components/elements/Header';

import './CheckEligibility.scss';

export default class CheckEligibilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      fname: '',
      lname: '',
      income: '',
      employeeStatus: '',
    };
    this.formRef = React.createRef();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleClick(e) {
    if (this.formRef.current.checkValidity()) {
      e.preventDefault();
      this.navigateToCardlist();
    }
  }

  navigateToCardlist() {
    const { income, employeeStatus } = this.state;
    const path = generatePath(
      '/cardlist?employee_status=:status&income_range=:income',
      {
        status: employeeStatus,
        income: income,
      }
    );
    this.props.history.push(path);
  }

  render() {
    const { title, fname, lname, income, employeeStatus } = this.state;

    return (
      <Page>
        <Layout>
          <Header>
            Free From Financial Stress <br />
            With The Right Card
          </Header>
          <form
            className="form eligibility-form"
            ref={this.formRef}
            id="check-eligibility-form"
          >
            <Select
              name="title"
              label="Title"
              value={title}
              options={[
                { label: 'Mr', value: 'Mr' },
                { label: 'Mrs', value: 'Mrs' },
                { label: 'Miss', value: 'Miss' },
              ]}
              onChange={(e) => this.handleChange(e)}
              required
              data-testid="select-title"
            />

            <TextField
              name="fname"
              type="text"
              label="First Name"
              value={fname}
              onChange={(e) => this.handleChange(e)}
              required
              data-testid="input-fname"
            />

            <TextField
              name="lname"
              type="text"
              label="Last Name"
              value={lname}
              onChange={(e) => this.handleChange(e)}
              required
              data-testid="input-lname"
            />

            <Select
              name="employeeStatus"
              label="What is your empployee status?"
              options={[
                { label: 'Full Time', value: 'ftime' },
                { label: 'Part Time', value: 'ptime' },
                { label: 'Student', value: 'student' },
              ]}
              value={employeeStatus}
              onChange={(e) => this.handleChange(e)}
              required
              data-testid="select-employee-status"
            />

            <TextField
              type="number"
              name="income"
              label="What is your annual income before tax?"
              value={income}
              onChange={(e) => this.handleChange(e)}
              required
              data-testid="input-income"
            />

            <Button
              type="submit"
              onClick={(e) => this.handleClick(e)}
              data-testid="check-eligible-btn"
            >
              Check Validity
            </Button>
          </form>
        </Layout>
      </Page>
    );
  }
}
