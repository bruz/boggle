import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { outOfTime } from './game';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { remaining: this.remaining() }
  }

  componentDidMount() {
    this.setupInterval();
  }

  setupInterval() {
    this.intervalID = setInterval(() => {
      const remaining = this.remaining();
      if (remaining <= 0) {
        clearInterval(this.intervalID);
        this.setState({ remaining: moment(0) })
        const name = prompt(`Your score is ${this.props.score}. Enter your name for the leader board.`)
        this.props.outOfTime(name);
        this.setupInterval();
      } else {
        this.setState({ remaining: remaining })
      }
    }, 100);
  }

  remaining() {
    const { endTime } = this.props;
    const now = moment();
    return moment(endTime.diff(now));
  }

  render() {
    const { remaining } = this.state;

    return (
      <div>
        {remaining.format('mm:ss')}
      </div>
    )
  }
}

export default connect(state => state, { outOfTime })(Timer)
