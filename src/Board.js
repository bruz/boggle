import React from 'react';
import { connect } from 'react-redux';
import { addIndex, map } from 'ramda';

const Die = ({ die }) => (
  <td className="Die">
    {die}
  </td>
)

const Row = ({ row }) => (
  <tr>
    {addIndex(map)((die, index) => <Die key={index} die={die} />, row)}
  </tr>
)

const Board = ({ board }) => (
  <table>
    <tbody>
      {addIndex(map)((row, index) => <Row key={index} row={row} />, board)}
    </tbody>
  </table>
);

export default connect(state => state)(Board);
