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

// function withMouse(ComposedComponent) {

//   return class extends React.Component {
//     state = { x: 0, y: 0 };

//     handleMouseMove = event => {
//       this.setState({ x: event.clientX, y: event.clientY });
//     };

//     render() {
//       return <ComposedComponent {...this.props} mouse={this.state} handleMouseMove={this.handleMouseMove}/>;
//     }
//   }
// }

// class App extends React.Component {

//   render() {
//     const { x, y } = this.props.mouse;

//     return (
//       <div className="container" onMouseMove={this.props.handleMouseMove}>
//         <h1>
//           The mouse position is ({x}, {y})
//         </h1>
//       </div>
//     );
//   }
// }

// const AppWithMouse = withMouse(App);

// ReactDOM.render(<AppWithMouse />, document.getElementById("app"));

// Version 2

function withMouse(ComposedComponent) {
  return class extends React.Component {
    state = { x: 0, y: 0 };

    handleMouseMove = event => {
      this.setState({ x: event.clientX, y: event.clientY });
    };

    render() {
      const { x, y } = this.state;
      return (
        <div className="container" onMouseMove={this.handleMouseMove}>
          <ComposedComponent {...this.props} x={x} y={y} />
        </div>
      );
    }
  };
}

function withCat(Component) {
  return class extends React.Component {
    state = { top: 0, left: 0 };

    componentDidUpdate(prevProps) {
      const { x, y } = this.props;

      if (x !== prevProps.x || y !== prevProps.y) {
        this.setState({
          top: y - Math.round(this.node.offsetHeight / 2),
          left: x - Math.round(this.node.offsetWidth / 2)
        });
      }
    }

    render() {
      return (
        <div>
          <div
            ref={node => (this.node = node)}
            className="cat"
            style={this.state}
          />
          <Component {...this.props} />
        </div>
      );
    }
  };
}

class App extends React.Component {
  render() {
    const { x, y } = this.props;

    return (
      <h1>
        The mouse position is ({x}, {y})
      </h1>
    );
  }
}

const AppWithMouse = withMouse(withCat(App));

ReactDOM.render(<AppWithMouse />, document.getElementById("app"));
