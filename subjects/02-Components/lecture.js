import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// let isOpen = false;

// function handleClick() {
//   isOpen = !isOpen;
//   updateThePage();
// }

// function ContentToggle() {
//   let summaryClassName = "content-toggle-summary";

//   if (isOpen) {
//     summaryClassName += " content-toggle-summary-open";
//   }

//   return (
//     <div className="content-toggle">
//       <button onClick={handleClick} className={summaryClassName}>
//         Tacos
//       </button>
//       {isOpen && (
//         <div className="content-toggle-details">
//           <p>
//             A taco is a traditional Mexican dish composed of a corn or
//             wheat tortilla folded or rolled around a filling.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// function updateThePage() {
//   ReactDOM.render(<div>
//       <ContentToggle />
//       <ContentToggle />
//     </div>, document.getElementById("app"));
// }

////////////////////////////////////////////////////////////////////////////////
// What happens when we want to render 2 <ContentToggle>s? Shared mutable state!

////////////////////////////////////////////////////////////////////////////////
// React gives us a component model we can use to encapsulate state at the
// instance level, so each component instance has its own state. Let's refactor
// this code to use a JavaScript class that extends React.Component.

//////////////////////////////////////////////////////////////////////////////////
// React gives us setState and automatically re-renders as the state changes.

////////////////////////////////////////////////////////////////////////////////
// Let's make <ContentToggle> re-usable and render a few of them. Title and
// children are properties we can pass in from the parent component.

////////////////////////////////////////////////////////////////////////////////
// Wrap a few <ContentToggle>s in a <ToggleTracker> that tracks the # of times
// it has been toggled and shows a counter. <ContentToggle> gets an onToggle
// handler. This is like a "custom event".

////////////////////////////////////////////////////////////////////////////////
// We can use propTypes to declare the name, type, and even default value of
// our props. These are like "runnable docs" for our code.

// class ContentToggle extends React.Component {
//   static propTypes = {
//     summary: PropTypes.string.isRequired,
//     children: PropTypes.node.isRequired,
//     onToggle: PropTypes.func
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       isOpen: false
//     };
//     this.handleClick = () => {
//       this.setState({ isOpen: !this.state.isOpen }); // this is what triggers dom re-rendering
//       if (this.props.onToggle) this.props.onToggle();
//     };
//   }

//   // Experimental new JS syntax! (Again!)
//   // props can be accessed via this.props as usual
//   //
//   // state = { isOpen: false };
//   // handleClick = () => {
//   //   this.setState({ isOpen: !this.state.isOpen});
//   // }

//   render() {
//     let summaryClassName = "content-toggle-summary";

//     if (this.state.isOpen) {
//       summaryClassName += " content-toggle-summary-open";
//     }

//     return (
//       <div className="content-toggle">
//         <button onClick={this.handleClick} className={summaryClassName}>
//           {this.props.summary}
//         </button>
//         {this.state.isOpen && (
//           <div className="content-toggle-details">
//             {this.props.children}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <div>
//     <ContentToggle
//       summary="Tacos"
//       onToggle={() => console.log("toggle!")}
//     >
//       <p>
//         A taco is a traditional Mexican dish composed of a corn or wheat
//         tortilla folded or rolled around a filling.
//       </p>
//     </ContentToggle>
//     <ContentToggle summary="Burritos">
//       <p>
//         A burrito is just pure deliciousness. Especially if it's from
//         Chipotle!
//       </p>
//     </ContentToggle>
//   </div>,
//   document.getElementById("app")
// );

// NOTE: 2nd time around to go over additional concept

function ContentToggle(props) {
  let summaryClassName = "content-toggle-summary";

  if (props.isOpen) {
    summaryClassName += " content-toggle-summary-open";
  }

  return (
    <div className="content-toggle">
      <button
        onClick={() => {
          if (props.onToggle) props.onToggle();
        }}
        className={summaryClassName}
      >
        {props.summary}
      </button>
      {props.isOpen && (
        <div className="content-toggle-details">{props.children}</div>
      )}
    </div>
  );
}

ContentToggle.propTypes = {
  summary: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func
};

class StatefulContentToggle extends React.Component {
  state = { isOpen: false };
  render() {
    return (
      <ContentToggle
        {...this.props}
        isOpen={this.state.isOpen}
        onToggle={() => this.setState({ isOpen: !this.state.isOpen })}
      />
    );
  }
}

class ContentToggleGroup extends React.Component {
  state = { tacoIsOpen: false, burritoIsOpen: false };

  toggleAll = () => {
    this.setState({
      tacoIsOpen: !this.state.tacoIsOpen,
      burritoIsOpen: !this.state.burritoIsOpen
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleAll}>Toggle All</button>

        <ContentToggle
          summary="Tacos"
          isOpen={this.state.tacoIsOpen}
          onToggle={() =>
            this.setState({ tacoIsOpen: !this.state.tacoIsOpen })
          }
        >
          <p>
            A taco is a traditional Mexican dish composed of a corn or
            wheat tortilla folded or rolled around a filling.
          </p>
        </ContentToggle>
        
        <ContentToggle
          summary="Burritos"
          isOpen={this.state.burritoIsOpen}
          onToggle={() =>
            this.setState({ burritoIsOpen: !this.state.burritoIsOpen })
          }
        >
          <p>
            A burrito is just pure deliciousness. Especially if it's from
            Chipotle!
          </p>
        </ContentToggle>

        <StatefulContentToggle summary="Tostados">
          <p>Tostados are awesome</p>
        </StatefulContentToggle>
      </div>
    );
  }
}

ReactDOM.render(<ContentToggleGroup />, document.getElementById("app"));
