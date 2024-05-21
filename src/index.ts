// const { newGame } = require('./tictactoe');
import { newGame } from './tictactoe';
// const { Grid3x3 } = require('./grid');
import { Grid3x3 } from './grid';

import type {
  TTTObject,
  PlayerValue,
  PositionValue,
  PatternPosition,
  CoordValue,
  Coord,
} from './tictactoe';

export { newGame, Grid3x3 };

export type {
  TTTObject,
  PlayerValue,
  PositionValue,
  PatternPosition,
  CoordValue,
  Coord,
};
