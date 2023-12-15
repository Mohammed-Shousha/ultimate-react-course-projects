import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    /* When React calls an event handler, it creates a copy of this function.
    So the function call will not be bound to the current this keyword.
    So we need to override the method to manully bind the this keyword to the method*/
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.setState((curState) => ({ count: curState.count - 1 }));
  }

  handleIncrement() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  render() {
    const date = new Date();
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
