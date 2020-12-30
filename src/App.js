import React from 'react';
import { Remarkable } from 'remarkable';
import './App.css';

// examples from https://reactjs.org/ home page

// A Simple Component

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        <h2>A Simple Component</h2>
        <p>Hello {this.props.name}</p>
      </div>
    );
  }
}

// A Stateful Component

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
      <h2>A Stateful Component</h2>
      <p>Seconds: {this.state.seconds}</p>
      </>
    );
  }

}

// An Application

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <>
      <h2>An Application</h2>
      <TodoList items={this.state.items} />
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="new-todo">
          What needs to be done?
        </label>
        <input 
          id="new-todo" 
          onChange={this.handleChange}
          value={this.state.text}
        />
        <button>
          Add #{this.state.items.length + 1}
        </button>
      </form>
      </>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    )
  }
}

// A Component Using External Plugins

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable();
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'Hello, **world**!' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  getRawMarkup() {
    return { __html: this.md.render(this.state.value) };
  }

  render() {
    return (
      <div className="MarkdownEditor">
        <h2>A Component Using External Plugins</h2>
        <h3>Input</h3>
        <label htmlFor="markdown-content">
          Enter some markdown
        </label>
        <textarea
          id="markdown-content"
          onChange={this.handleChange}
          defaultValue={this.state.value}
        />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
      </div>
    );
  }
}

function App() {
  return (
    <>
    <HelloMessage name="Fred" />
    <Timer />
    <TodoApp />
    <MarkdownEditor />
    </>
  );
}

export default App;
