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
export const SUBMIT_WORD = 'SUBMIT_WORD';

export const clickDie = (x, y) => ({ type: CLICK_DIE, x, y });
export const submitWord = () => ({ type: SUBMIT_WORD });

const scoreWord = letters => {
  const length = letters.length;

  if (length <= 4) return 1;
  else if (length <= 5) return 2;
  else if (length <= 6) return 3;
  else if (length <= 7) return 5;
  else return 11;
};

export const expandLetters = letters =>
  letters.replace(/q/g, 'qu');

const reducer = (state = { board: generateBoard(), word: [], score: 0, completedWords: [] }, action) => {
  const { type, x, y } = action;
  const { board, completedWords, score, word } = state;
  const lastDie = last(word);

  switch(type) {
    case CLICK_DIE: {
      if (lastDie) {
        if (x === lastDie.x && y === lastDie.y) {
          const updatedWord = word.concat()
          updatedWord.pop();
          return { ...state, word: updatedWord };
        }

        if (find(die => die.x === x && die.y === y, word)) return state;

        if (Math.abs(x - lastDie.x) > 1 || Math.abs(y - lastDie.y) > 1) {
          return state;
        }
      }
      const letter = board[y][x];
      const updatedWord = state.word.concat({ letter, x, y });
      return { ...state, word: updatedWord }
    }
    case SUBMIT_WORD: {
      const letters = expandLetters(word.map(die => die.letter).join(''));

      if (window.dictionary[letters]) {
        const wordScore = scoreWord(letters);

        return {
          ...state,
          score: score + wordScore,
          completedWords: completedWords.concat({ letters, wordScore }),
          word: [],
        }
      } else {
        return {
          ...state,
          score: score - 2,
          word: [],
        }
      }
    }
    default:
      return state;
  }
}

export default reducer;
