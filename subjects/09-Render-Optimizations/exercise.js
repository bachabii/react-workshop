////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Modify <ListView> so that it only renders the list items that are visible!
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (hint: Listen
//   for the window's "resize" event)
// - Remember the scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as RainbowListDelegate from "./RainbowListDelegate";

class ListView extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  };

  state = {
    availableHeight: 0,
    scrollPosition: 0
  };

  componentWillMount() {
    if (localStorage.scrollPosition) {
      this.setState({ scrollPosition: JSON.parse(localStorage.scrollPosition) });
    }
  }

  componentDidMount() {
    this.storeHeight();
    window.addEventListener('resize', this.storeHeight);

    window.addEventListener('beforeunload', () => {
      localStorage.scrollPosition = JSON.stringify(this.state.scrollPosition);
    });

    if (this.node.scrollTop !== this.state.scrollPosition) {
      this.node.scrollTop = this.state.scrollPosition;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.storeHeight);
  }

  storeHeight = () => {
    this.setState({ availableHeight: this.node.clientHeight });
  }

  scrolled = e => {
    this.setState({ scrollPosition: e.target.scrollTop });
  };

  render() {
    const { availableHeight, scrollPosition } = this.state;
    const { numRows, rowHeight, renderRowAtIndex } = this.props;
    const totalHeight = numRows * rowHeight;

    // HINT: Make these numbers closer together!
    const startIndex = Math.floor(scrollPosition / rowHeight);
    const endIndex =
      Math.ceil(availableHeight / rowHeight) + startIndex;

    const items = [];

    let index = startIndex;
    while (index < endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>);
      index++;
    }

    return (
      <div
        style={{ height: "100vh", overflowY: "scroll" }}
        onScroll={this.scrolled}
        ref={node => (this.node = node)}
      >
        <div
          style={{
            height: totalHeight,
            paddingTop: startIndex * rowHeight
          }}
        >
          <ol>{items}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ListView
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById("app")
);
