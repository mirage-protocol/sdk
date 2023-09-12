import { mirageAddress } from '../constants'
import { Payload } from './'

const type = 'entry_function_payload'

/**
 * Claims devnet USDC tokens
 * @returns payload for the transaction
 */
export const claimTokens = (): Payload => {
  return {
    type,
    function: `${mirageAddress()}::distributor::claim_tokens`,
    arguments: [],
    type_arguments: [],
  }
}
