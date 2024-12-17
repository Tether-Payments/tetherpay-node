import { Base } from './base.js';
import { Sessions } from './sessions/index.js';
import { Transactions } from './transaction/index.js';
import { applyMixins } from './utils.js';

class TetherPayments extends Base {}
interface TetherPayments extends Sessions {}
interface TetherPayments extends Transactions {}

applyMixins(TetherPayments, [Sessions, Transactions]);

export { TetherPayments };
