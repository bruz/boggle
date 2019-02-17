import React from 'react';
import { connect } from 'react-redux';
import { addIndex, find, map } from 'ramda';

import { clickDie } from './game';

const Die = ({ die, x, y, word, clickDie }) => {
  const inWord = !!find(d => d.x === x && d.y === y, word);

  return (
    <td className="Die" style={{ backgroundColor: inWord && 'rgb(255,255,153)' }} onClick={() => clickDie(x, y)}>
      {die === 'q' ? 'qu' : die}
    </td>
  )
}

const Row = ({ row, y, word, clickDie }) => (
  <tr>
    {addIndex(map)((die, index) => (
      <Die key={index} x={index} y={y} die={die} word={word} clickDie={clickDie} />
    ), row)}
  </tr>
)

class Board extends React.Component {
  componentDidMount() {
    fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json').then(response => {
      response.json().then(json => {
        window.dictionary = json;
      });
    })
  }

  render() {
    const { board, clickDie, word } = this.props;

    return (
      <table>
        <tbody>
          {addIndex(map)((row, index) => (
            <Row key={index} y={index} row={row} word={word} clickDie={clickDie} />
          ), board)}
        </tbody>
      </table>
    );
  }
}

export default connect(state => state, { clickDie })(Board);
