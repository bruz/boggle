import React from 'react';
import { connect } from 'react-redux';
import { addIndex, map } from 'ramda';

import { clickDie } from './game';

const Die = ({ die, x, y, clickDie }) => (
  <td className="Die" onClick={() => clickDie(x, y)}>
    {die}
  </td>
)

const Row = ({ row, y, clickDie }) => (
  <tr>
    {addIndex(map)((die, index) => (
      <Die key={index} x={index} y={y} die={die} clickDie={clickDie} />
    ), row)}
  </tr>
)

const Board = ({ board, clickDie }) => (
  <table>
    <tbody>
      {addIndex(map)((row, index) => (
        <Row key={index} y={index} row={row} clickDie={clickDie} />
      ), board)}
    </tbody>
  </table>
);

export default connect(state => state, { clickDie })(Board);
