import { formatUnits } from "viem";

export function formatToken(
  value: bigint,
  decimals = 18
) {
  return Number(formatUnits(value, decimals)).toLocaleString();
}