////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls the form's `onSubmit` handler
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the form's `onSubmit` handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useState, useContext, useEffect } from "react";

const FormContext = React.createContext();

class Form extends React.Component {
  state = { values: {} };

  handleSubmit = () => {
    if (this.props.onSubmit) this.props.onSubmit(this.state.values);
  };  

  updateNames = (name, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value
      }
    }));
  }

  handleReset = () => {
    this.setState({ values: {} });
  }

  render() {
    return (
      <FormContext.Provider
        value={{
          handleSubmit: this.handleSubmit,
          inputChanged: this.updateNames,
          handleReset: this.handleReset,
          values: this.state.values
        }}
      >
        <div>{this.props.children}</div>
      </FormContext.Provider>
    );
  }
}

function SubmitButton(props) {
  const form = useContext(FormContext);
  return <button onClick={form.handleSubmit}>{props.children}</button>;
}


function ResetButton(props) {
  const form = useContext(FormContext);
    return <button onClick={form.handleReset}>{props.children}</button>;
}

function TextInput({ name, defaultValue, placeholder }) {
  const form = useContext(FormContext);
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      form.handleSubmit();
    }
  }

  const handleInputChange = (event) => {
    form.inputChanged(name, event.target.value);
  }

  useEffect(() => {
    form.inputChanged(name, defaultValue)
  }, []);

  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      onChange={handleInputChange}
      value={form.values[name] || ""}
    />
  );

}

class App extends React.Component {

  handleSubmit = (values) => {
    alert(`YOU WIN! ${values.firstName} ${values.lastName}`);
  };

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" defaultValue="" placeholder="First Name" />{" "}
            <TextInput name="lastName" defaultValue="" placeholder="Last Name" />
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>{" "}
            <ResetButton>Reset</ResetButton>
          </p>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
