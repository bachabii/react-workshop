////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a <GeoPosition> component that encapsulates the geo state and
//   watching logic and uses a render prop to pass the coordinates back to
//   the <App>
//
// Tip: If you're on a Mac, you may need to enable Location Services in order
//      for your browser to determine your current location. Open
//      System Preferences > Security & Privacy > Privacy > Location Services
//      and make sure the "Enable Location Services" box is checked.
//
// Got extra time?
//
// - Create a <GeoAddress> component that translates the geo coordinates to a
//   physical address and prints it to the screen (hint: use
//   `getAddressFromCoords(lat, lng).then(address => ...)`)
// - You should be able to compose <GeoPosition> and <GeoAddress> beneath it to
//   naturally compose both the UI and the state needed to render it
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import LoadingDots from "./LoadingDots";
import getAddressFromCoords from "./utils/getAddressFromCoords";

class GeoPosition extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  state = {
    coords: {
      latitude: null,
      longitude: null
    },
    error: null
  };

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      error => {
        this.setState({ error });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  render() {
    return this.props.children(this.state);
  }
}

// class GeoAddress extends React.Component {
//   static propTypes = {
//     children: PropTypes.func.isRequired,
//     long: PropTypes.number,
//     lat: PropTypes.number
//   };

//   state = { address: null };

//   fetchAddress() {
//     const { lat, long } = this.props;
//     if (lat && long) {
//       getAddressFromCoords(lat, long).then(address => {
//         this.setState({ address: address });
//       });
//     }
//   }

//   componentDidMount() {
//     this.fetchAddress();
//   }

//   componentDidUpdate(prevProps) {
//     const { lat: prevLat, long: prevLong } = prevProps;
//     const { lat: nextLat, long: nextLong } = this.props;

//     if (prevLat !== nextLat || prevLong !== nextLong) {
//       this.fetchAddress();
//     }
//   }

//   render() {
//     return this.props.children(this.state.address);
//   }
// }

function GeoAddress({ lat, long, children }) {
  const [address, setAddress] = useState(null);

  const fetchAddress = () => {
    if (lat && long) {
      getAddressFromCoords(lat, long).then(setAddress);
    }
  }

  useEffect(() => {
    fetchAddress();
  }, []);

  useEffect(() => {
    fetchAddress();
  }, [lat, long]);

  return children(address);
}

// How to take render props and put in HOC

// function withGeo(Component) {
//   return props => (
//     <GeoPosition render={state => <Component {...props} geo={state} />} />
//     );
// }

class App extends React.Component {
  // const { error, coords } = this.props;
  render() {
    return (
      <div>
        <h1>Geolocation</h1>
        <GeoPosition>
          {data => (
            <div>
              {/* <h1>Geolocation</h1> */}
              {data.error ? (
                <div>Error: {data.error.message}</div>
              ) : (
                <dl>
                  <dt>Latitude</dt>
                  <dd>{data.coords.latitude || <LoadingDots />}</dd>
                  <dt>Longitude</dt>
                  <dd>{data.coords.longitude || <LoadingDots />}</dd>
                </dl>
              )}
            </div>
          )}
        </GeoPosition>

        <h1>Geoaddress</h1>
        <GeoPosition>
          {data => (
            <GeoAddress
              long={data.coords.longitude}
              lat={data.coords.latitude}
            >
              {address => <p>{address || <LoadingDots />}</p>}
            </GeoAddress>
          )}
        </GeoPosition>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
