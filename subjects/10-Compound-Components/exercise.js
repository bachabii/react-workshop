////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Got extra time?
//
// - Implement an `onChange` prop that communicates the <RadioGroup>'s state
//   back to the <App> so it can use it to render something
// - Implement keyboard controls on the <RadioGroup>
//   - Hint: Use tabIndex="0" on the <RadioOption>s so the keyboard will work
//   - Enter and space bar should select the option
//   - Arrow right, arrow down should select the next option
//   - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class RadioGroup extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string
  };

  state = {
    value: this.props.defaultValue,
    index: 0
  };

  updateFocus = index => {
    this._focusIndex = index;

    this.forceUpdate(() => {
      delete this._focusIndex;
    });
  };

  select = value => {
    this.setState(
      {
        value
      },
      () => this.props.onChange(value)
    );
  };

  render() {
    const length = React.Children.toArray(this.props.children).length;

    return (
      <div>
        {React.Children.map(this.props.children, (child, index) => {
          return React.cloneElement(child, {
            _isActive: child.props.value === this.state.value,
            _makeFocused: this._focusIndex === index,
            _select: () => this.select(child.props.value),
            _focusPrev: () => this.updateFocus((index === 0 ? length : index) - 1),
            _focusNext: () => this.updateFocus(index === length - 1 ? 0 : index + 1)
          });
        })}
      </div>
    );
  }
}

class RadioOption extends React.Component {
  static propTypes = {
    value: PropTypes.string
  };

  handleKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      this.props._focusNext();
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      this.props._focusPrev();
    } else if (event.key === "Enter" || event.key === " ") {
      this.props._select();
    }
  }

  componentDidUpdate() {
    if (this.props._makeFocused) this.node.focus();
  }

  render() {
    return (
      <div 
        onClick={this.props._select}
        onKeyDown={this.handleKeyDown}
        ref={node => this.node = node}
        tabIndex="0"
      >
        <RadioIcon isSelected={this.props._isActive} />{" "}
        {this.props.children}
      </div>
    );
  }
}

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div
        style={{
          borderColor: "#ccc",
          borderWidth: 3,
          borderStyle: this.props.isSelected ? "inset" : "outset",
          height: 16,
          width: 16,
          display: "inline-block",
          cursor: "pointer",
          background: this.props.isSelected ? "rgba(0, 0, 0, 0.05)" : ""
        }}
      />
    );
  }
}

class App extends React.Component {

  state = {
    value: "fm"
  }
  render() {
    return (
      <div>
        <h1>♬ It's about time that we all turned off the radio ♫</h1>
        <h2>Radio Station: {this.state.value}</h2>
        <RadioGroup
          defaultValue={this.state.value}
          onChange={value =>
            this.setState({ value })
          }
        >
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
        </RadioGroup>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
