import AddAndBorrow from '../../artifacts/script_code/add_and_borrow.json'
import AddAndRepay from '../../artifacts/script_code/add_and_repay.json'
import RegisterAndOpenPosition from '../../artifacts/script_code/register_and_open_position.json'
import RegisterAndPlaceLimit from '../../artifacts/script_code/register_and_place_limit.json'
import RemoveAndBorrow from '../../artifacts/script_code/remove_and_borrow.json'
import RepayAndRemove from '../../artifacts/script_code/repay_and_remove.json'

export type ModuleScript =
  | 'register_and_open_position'
  | 'remove_and_borrow'
  | 'add_and_borrow'
  | 'add_and_repay'
  | 'repay_and_remove'
  | 'register_and_place_limit'

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
  register_and_open_position: RegisterAndOpenPosition.code as string,
  register_and_place_limit: RegisterAndPlaceLimit.code as string,

  // vault
  remove_and_borrow: RemoveAndBorrow.code as string,
  add_and_borrow: AddAndBorrow.code as string,
  add_and_repay: AddAndRepay.code as string,
  repay_and_remove: RepayAndRemove.code as string,
}
