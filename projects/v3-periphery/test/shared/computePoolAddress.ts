import { bytecode } from '@pancakeswap/v3-core/artifacts/contracts/PancakeV3Pool.sol/PancakeV3Pool.json'
import { utils } from 'ethers'

export const POOL_BYTECODE_HASH = utils.keccak256(bytecode)

export function computePoolAddress(deployerAddress: string, [tokenA, tokenB]: [string, string], fee: number): string {
  const [token0, token1] = tokenA.toLowerCase() < tokenB.toLowerCase() ? [tokenA, tokenB] : [tokenB, tokenA]
  const constructorArgumentsEncoded = utils.defaultAbiCoder.encode(
    ['address', 'address', 'uint24'],
    [token0, token1, fee]
  )
  const create2Inputs = [
    '0xff',
    deployerAddress,
    // salt
    utils.keccak256(constructorArgumentsEncoded),
    // init code hash
    POOL_BYTECODE_HASH,
  ]
  const sanitizedInputs = `0x${create2Inputs.map((i) => i.slice(2)).join('')}`
  return utils.getAddress(`0x${utils.keccak256(sanitizedInputs).slice(-40)}`)
}
