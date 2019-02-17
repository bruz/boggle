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

export const CLICK_DIE = 'CLICK_DIE';

export const clickDie = (x, y) => ({ type: CLICK_DIE, x, y });

const reducer = (state = { board: generateBoard(), word: [] }, action) => {
  const { type, x, y } = action;
  const { board, lastPosition } = state;

  switch(type) {
    case CLICK_DIE: {
      if (lastPosition) {
        if (x === lastPosition.x && y === lastPosition.y) return state;

        if (Math.abs(x - lastPosition.x) > 1 || Math.abs(y - lastPosition.y) > 1) {
          return state;
        }
      }
      const letter = board[y][x];
      const updatedWord = state.word.concat(letter);
      return { ...state, word: updatedWord, lastPosition: { x, y } }
    }
    default:
      return state;
  }
}

export default reducer;
