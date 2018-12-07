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

class SubmitButton extends React.Component {
  render() {
    return <button onClick={this.context.handleSubmit}>{this.props.children}</button>;
  }
}

SubmitButton.contextType = FormContext;

class ResetButton extends React.Component {
  render() {
    return <button onClick={this.context.handleReset}>{this.props.children}</button>;
  }
}

ResetButton.contextType = FormContext;

class TextInput extends React.Component {
  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.context.handleSubmit();
    }
  }

  handleInputChange = () => {
    this.context.inputChanged(this.props.name, this.node.value);
  }

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleInputChange}
        value={this.context.values[this.props.name] || ""}
        ref={node => (this.node = node)}
      />
    );
  }
}

TextInput.contextType = FormContext;

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
            <TextInput name="firstName" placeholder="First Name" />{" "}
            <TextInput name="lastName" placeholder="Last Name" />
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
