import React from 'react';
import { connect } from 'react-redux';
import { addIndex, map } from 'ramda';

const Leader = ({ leader }) => (
  <li>{leader.name}: {leader.score}</li>
)

const Leaderboard = ({ leaderboard }) => (
  <div>
    The best Bogglers

    <ul>
      {addIndex(map)((l, index) => <Leader key={index} leader={l} />, leaderboard)}
    </ul>
  </div>
)

export default connect(state => state)(Leaderboard);
