import { find, last, splitEvery, times } from 'ramda';

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
    const index = getRandomInt(dice.length);
    const die = dice[index];
    randomized.push(die);
    dice.splice(index, 1);
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
  const { board, word } = state;
  const lastDie = last(word);

  switch(type) {
    case CLICK_DIE: {
      if (lastDie) {
        if (find(die => die.x === x && die.y === y, word)) return state;

        if (Math.abs(x - lastDie.x) > 1 || Math.abs(y - lastDie.y) > 1) {
          return state;
        }
      }
      const letter = board[y][x];
      const updatedWord = state.word.concat({ letter, x, y });
      return { ...state, word: updatedWord }
    }
    default:
      return state;
  }
}

export default reducer;
