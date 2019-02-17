import React from 'react';
import { connect } from 'react-redux';
import { addIndex, map } from 'ramda';

const CompletedWord = ({ word }) => (
  <li>
    {word.letters}: {word.wordScore}
  </li>
)

const Score = ({ completedWords, score }) => (
  <div>
    Total score: {score}

    <ul>
      {addIndex(map)((word, index) => <CompletedWord key={index} word={word} />, completedWords)}
    </ul>
  </div>
);

export default connect(state => state)(Score);
