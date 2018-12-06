////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Tip: The app uses a pop-up window for auth with GitHub. You may need to
//      make sure that you aren't blocking pop-up windows on localhost!
//
// Need some ideas?
//
// - Group subsequent messages from the same sender
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Cause the message list to automatically scroll as new messages come in
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom";
import { login, sendMessage, subscribeToMessages } from "./utils";

/*
Here's how to use the utils:

login(user => {
  // do something with the user object
})

sendMessage({
  userId: user.id,
  photoURL: user.photoURL,
  text: 'hello, this is a message'
})

const subscribe = subscribeToMessages(messages => {
  // here are your messages as an array, it will be called
  // every time the messages change
})

unsubscribe() // stop listening for new messages

The world is your oyster!
*/

function MessageItem(props) {
  return (
    <li className="message-group">
        <div className="message-group-avatar">
          <img src={props.msg.photoURL} />
        </div>
        <ol className="messages">
          <li className="message">{props.msg.text}</li>
        </ol>
      </li>
  );
}

class Chat extends React.Component {
  state = { user: null, messages: [] };

  componentDidMount() {
    // Called immediately after this element is mounted into the DOM

    login(user => {
      this.setState({ user });

      subscribeToMessages( messages => {
        this.setState({ messages });
      });

    });
    //
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const messages = this.refs.messages;
    messages.scrollTop = messages.scrollHeight;
  }

  componentWillUnmount() {
    // Called immediately before this element is removed from the DOM

    this.unsubscribe();
  }

  handleSubmit = event => {
    event.preventDefault();
    // const e = event.nativeEvent;
    // const message = e.target[0].value;
    const message = this.refs.message.value;

    sendMessage({
      userId: this.state.user.id,
      photoURL: this.state.user.photoURL,
      text: message
    });

    event.target.reset();
  }
  render() {
    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">HipReact</h1>
          <p className="chat-message-count"># messages: {this.state.messages.length}</p>
        </header>
        <div className="messages" ref="messages">
          <ol className="message-groups">
            {this.state.messages.map( (msg) => 
              <MessageItem key={msg.id} msg={msg}/>
            )}
          </ol>
        </div>
        <form className="new-message-form" onSubmit={this.handleSubmit}>
          <div className="new-message">
            <input
              ref="message"
              type="text"
              placeholder="say something..."
            />
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<Chat />, document.getElementById("app"));
