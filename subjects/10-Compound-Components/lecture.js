import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

import * as styles from "./styles";

// class Tabs extends React.Component {
//   state = { activeIndex: 0 };
//   selectIndex = index => this.setState({ activeIndex: index });

//   render() {
//     return (
//       <div>
//         {React.Children.map(this.props.children, child => {
//           if (child.type === TabList) {
//             return React.cloneElement(child, {
//               _activeIndex: this.state.activeIndex,
//               _selectIndex: this.selectIndex
//             });
//           } else if (child.type === TabPanels) {
//             return React.cloneElement(child, {
//               _activeIndex: this.state.activeIndex
//             });
//           }
//           return child;
//         })}
//       </div>
//     );
//   }
// }

// function TabList({ children, _activeIndex, _selectIndex }) {
//   return (
//     <div style={styles.tabList}>
//       {React.Children.map(children, (child, index) => {
//         return React.cloneElement(child, {
//           _isActive: _activeIndex === index,
//           _onSelect: () => _selectIndex(index)
//         });
//       })}
//     </div>
//   );
// }

// function Tab({ children, disabled, _isActive, _onSelect }) {
//   return (
//     <div
//       style={
//         disabled
//           ? styles.disabledTab
//           : _isActive
//           ? styles.activeTab
//           : styles.tab
//       }
//       onClick={disabled ? null : _onSelect}
//     >
//       {children}
//     </div>
//   );
// }

// function TabPanels({ children, _activeIndex }) {
//   return <div style={styles.tabPanels}>{
//     React.Children.toArray(children)[_activeIndex]
//   }</div>;
// }

// function TabPanel({ children }) {
//   return <div>{children}</div>;
// }

// class DataTabs extends React.Component {
//   static defaultProps = {
//     disabled: []
//   }

//   render() {
//     const { data } = this.props;
//     return (
//       <Tabs>
//         <TabList>
//           {data.map((item, index) => (
//             <Tab
//               key={item.label}
//               disabled={this.props.disabled.indexOf(index) !== -1}
//             >
//               {item.label}
//             </Tab>
//           ))}
//         </TabList>
//         <TabPanels>
//           {data.map( item => (
//             <TabPanel key={item.label}>{item.content}</TabPanel>
//           ))}
//         </TabPanels>
//       </Tabs>
//     )
//   }
// }


// class App extends React.Component {
//   render() {
//     const tabData = [
//       {
//         label: "Tacos",
//         content: <p>Tacos are delicious</p>
//       },
//       {
//         label: "Burritos",
//         content: <p>Sometimes a burrito is what you really need</p>
//       },
//       {
//         label: "Coconut Korma",
//         content: <p>Might be your best option</p>
//       }
//     ];

//     // return (
//     //   <Tabs>
//     //     <TabList>
//     //       <Tab>Tacos</Tab>
//     //       <Tab>Burritos</Tab>
//     //       <Tab>Coconut Korma</Tab>
//     //     </TabList>
//     //     <TabPanels>
//     //       <TabPanel>Tacos content</TabPanel>
//     //       <TabPanel>Burrito content</TabPanel>
//     //       <TabPanel>Coconut Korma content</TabPanel>
//     //     </TabPanels>
//     //   </Tabs>
//     // );

//     return (
//       <div>
//         <DataTabs data={tabData} />
//       </div>
//     );
//   }
// }


// ReactDOM.render(<App />, document.getElementById("app"));



function Tabs(props) {
  // state = { activeIndex: 0 };
  // selectIndex = index => this.setState({ activeIndex: index });

 
    const [activeIndex, selectIndex] = useState(0);
    return (
      <div>
        {React.Children.map(props.children, child => {
          if (child.type === TabList) {
            return React.cloneElement(child, {
              _activeIndex: activeIndex,
              _selectIndex: selectIndex
            });
          } else if (child.type === TabPanels) {
            return React.cloneElement(child, {
              _activeIndex: activeIndex
            });
          }
          return child;
        })}
      </div>
    );
  
}

function TabList({ children, _activeIndex, _selectIndex }) {
  return (
    <div style={styles.tabList}>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          _isActive: _activeIndex === index,
          _onSelect: () => _selectIndex(index)
        });
      })}
    </div>
  );
}

function Tab({ children, disabled, _isActive, _onSelect }) {
  return (
    <div
      style={
        disabled
          ? styles.disabledTab
          : _isActive
          ? styles.activeTab
          : styles.tab
      }
      onClick={disabled ? null : _onSelect}
    >
      {children}
    </div>
  );
}

function TabPanels({ children, _activeIndex }) {
  return <div style={styles.tabPanels}>{
    React.Children.toArray(children)[_activeIndex]
  }</div>;
}

function TabPanel({ children }) {
  return <div>{children}</div>;
}

class DataTabs extends React.Component {
  static defaultProps = {
    disabled: []
  }

  render() {
    const { data } = this.props;
    return (
      <Tabs>
        <TabList>
          {data.map((item, index) => (
            <Tab
              key={item.label}
              disabled={this.props.disabled.indexOf(index) !== -1}
            >
              {item.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {data.map( item => (
            <TabPanel key={item.label}>{item.content}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    )
  }
}


class App extends React.Component {
  render() {
    const tabData = [
      {
        label: "Tacos",
        content: <p>Tacos are delicious</p>
      },
      {
        label: "Burritos",
        content: <p>Sometimes a burrito is what you really need</p>
      },
      {
        label: "Coconut Korma",
        content: <p>Might be your best option</p>
      }
    ];

    // return (
    //   <Tabs>
    //     <TabList>
    //       <Tab>Tacos</Tab>
    //       <Tab>Burritos</Tab>
    //       <Tab>Coconut Korma</Tab>
    //     </TabList>
    //     <TabPanels>
    //       <TabPanel>Tacos content</TabPanel>
    //       <TabPanel>Burrito content</TabPanel>
    //       <TabPanel>Coconut Korma content</TabPanel>
    //     </TabPanels>
    //   </Tabs>
    // );

    return (
      <div>
        <DataTabs data={tabData} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("app"));