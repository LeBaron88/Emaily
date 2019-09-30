import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {
  renderSurveyFields() {
    return formFields.map(({ label, name }) => {
      return (
        <Field
          key={name}
          id={name}
          label={label}
          type="text"
          name={name}
          component={SurveyField}
        />
      );
    });
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderSurveyFields()}

        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');
  formFields.forEach(({ name }) => {
    if (!values[name]) {
      name === 'recipients'
        ? (errors[name] = `you must provide a list of ${name}`)
        : (errors[name] = `you must provide a  ${name}`);
    }
  });

  return errors;
};

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false
})(SurveyForm);
