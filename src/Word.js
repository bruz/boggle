import React from 'react';
import { connect } from 'react-redux';
import { map } from 'ramda';

import { expandLetters, submitWord } from './game';

const Word = ({ submitWord, word }) => {
  const letters = expandLetters(map(({ letter }) => letter, word).join(''))

  return (
    <div className="word">
      {letters}
      <button disabled={letters.length < 3} onClick={submitWord}>Submit</button>
    </div>
  );
}

export default connect(state => state, { submitWord })(Word);
