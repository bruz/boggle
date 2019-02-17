import { map, splitEvery, times } from 'ramda';

const DICE = [
  'aaafrs',
  'aaeeee',
  'aafirs',
  'adennn',
  'aeeeem',
  'aeegmu',
  'aegmnn',
  'afirsy',
  'bjkqxz',
  'ccenst',
  'ceiilt',
  'ceilpt',
  'ceipst',
  'ddhnot',
  'dhhlor',
  'dhlnor',
  'dhlnor',
  'eiiitt',
  'emottt',
  'ensssu',
  'fiprsy',
  'gorrvw',
  'iprrry',
  'nootuw',
  'ooottu',
]

const SIZE = 5;

const getRandomInt = n => Math.floor(Math.random() * Math.floor(n))

const getDieSide = () => getRandomInt(6);

const randomOrderDice = () => {
  const dice = DICE.concat();
  const randomized = [];

  times(() => {
    const die = dice[getRandomInt(dice.length)];
    randomized.push(die);
  }, SIZE*SIZE)

  return randomized;
};

const randomDiceValues = () =>
  randomOrderDice().map(die => die[getDieSide()]);

const generateBoard = () =>
  splitEvery(SIZE, randomDiceValues());

const reducer = (state = { board: generateBoard() }, action) => {
  console.log('STATE', state);
  switch(action) {
    default:
      return state;
  }
}

export default reducer;
