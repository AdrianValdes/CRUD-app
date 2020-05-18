import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div style={{ color: 'red' }}>{error}</div>;
    }
  };

  renderInput = (formProps) => {
    const { input, label, meta } = formProps;
    return (
      <div>
        <label> {label} </label>
        <br />
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button>Submit</button>
      </form>
    );
  }
}

function validate(formValues) {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
}

export default reduxForm({ form: 'streamForm', validate })(StreamForm);
