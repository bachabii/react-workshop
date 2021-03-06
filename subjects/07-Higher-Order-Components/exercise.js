////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Make the mouse-tracking logic reusable by filling in the `withMouse`
//   higher-order component and returning a new component that renders a
//   `ComposedComponent` element with the current mouse position as props
// - Use the `withMouse` function you just wrote to create an `AppWithMouse`
//   component
// - Render <AppWithMouse> instead of <App>
//
// Got extra time?
//
// - Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function withMouse(ComposedComponent) {
  // TODO
}

class App extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = event => {
    this.setState({ x: event.clientX, y: event.clientY });
  };

  render() {
    const { x, y } = this.state;

    return (
      <div className="container" onMouseMove={this.handleMouseMove}>
        <h1>
          The mouse position is ({x}, {y})
        </h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
