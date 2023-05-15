import AddAndBorrow from '../../artifacts/script_hex/add_and_borrow.json'
import AddAndRepay from '../../artifacts/script_hex/add_and_repay.json'
import CompoundVe from '../../artifacts/script_hex/compound_ve.json'
import RegisterAndOpenTrade from '../../artifacts/script_hex/register_and_open_trade.json'
import RegisterAndPlaceLimit from '../../artifacts/script_hex/register_and_place_limit.json'
import RemoveAndBorrow from '../../artifacts/script_hex/remove_and_borrow.json'
import RepayAndRemove from '../../artifacts/script_hex/repay_and_remove.json'

export type ModuleScript =
  | 'register_and_open_trade'
  | 'remove_and_borrow'
  | 'add_and_borrow'
  | 'add_and_repay'
  | 'repay_and_remove'
  | 'register_and_place_limit'
  | 'compound_ve'

export const getScriptBytecode = (script: ModuleScript): Uint8Array => {
  try {
    const bytecode = scriptBytecode[script]
    return Uint8Array.from(Buffer.from(bytecode, 'hex'))
  } catch (error) {
    console.error(`Error reading script_bytecode .json file. Ensure script bytecode has been generated: ${error}`)
    return Uint8Array.from(Buffer.from('', 'hex'))
  }
}

const scriptBytecode: { [script in ModuleScript]: string } = {
  // market
  register_and_open_trade: RegisterAndOpenTrade.code as string,

  // vault
  remove_and_borrow: RemoveAndBorrow.code as string,
  add_and_borrow: AddAndBorrow.code as string,
  add_and_repay: AddAndRepay.code as string,
  repay_and_remove: RepayAndRemove.code as string,
  register_and_place_limit: RegisterAndPlaceLimit.code as string,

  // ve
  compound_ve: CompoundVe.code as string,
}
