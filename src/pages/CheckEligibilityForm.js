import React, { Component } from 'react';
import { generatePath } from 'react-router-dom';

// Components
import Layout from 'components/elements/Layout';
import Form from 'components/elements/Form';
import Select from 'components/elements/Select';
import TextField from 'components/elements/TextField';
import Link from 'components/elements/Link';

export default class CheckEligibilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      fname: '',
      lname: '',
      income: '',
      employeeStatus: '',
      dob: '',
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log(e.target);
    this.setState({ [name]: value });
  }

  render() {
    const { title, fname, lname, income, employeeStatus, dob } = this.state;
    return (
      <Layout>
        <Form className="eligibility-form">
          <Select
            name="title"
            label="Title"
            options={[
              { label: 'Mr', value: 'Mr' },
              { label: 'Mrs', value: 'Mrs' },
              { label: 'Miss', value: 'Miss' },
            ]}
            onChange={(e) => this.handleChange(e)}
            required
          />

          <TextField
            name="fname"
            type="text"
            label="First Name"
            value={fname}
            onChange={(e) => this.handleChange(e)}
          />

          <TextField
            name="lname"
            type="text"
            label="Last Name"
            value={lname}
            onChange={(e) => this.handleChange(e)}
          />

          <TextField
            name="dob"
            type="text"
            label="Date of Birth"
            value={dob}
            onChange={(e) => this.handleChange(e)}
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
          />

          <TextField
            type="number"
            name="income"
            label="What is your annual income before tax?"
            value={income}
            onChange={(e) => this.handleChange(e)}
          />

          <Link
            to={generatePath(
              '/cardlist/employee_status=:status&income_range=:income',
              {
                status: 'student',
                income: 1000,
              }
            )}
            bold={true}
          >
            Check Eligibility
          </Link>
        </Form>
      </Layout>
    );
  }
}
