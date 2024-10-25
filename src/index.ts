import { Base } from "./base";
import { Sessions } from "./sessions";
import { applyMixins } from "./utils";

class TetherPayments extends Base {}
interface TetherPayments extends Sessions {}

applyMixins(TetherPayments, [Sessions]);

export{ TetherPayments };
