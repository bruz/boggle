import React from 'react';
import { connect } from 'react-redux';
import { map } from 'ramda';

const Word = ({ word }) => (
  <div className="word">
    {map(({ letter }) => letter, word).join('')}
  </div>
);

export default connect(state => state)(Word);
