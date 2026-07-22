import { formatUnits } from "viem";

export function formatToken(
  value: bigint,
  decimals: number,
  symbol?: string
) {
  const formatted = Number(formatUnits(value, decimals));

  return `${formatted.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  })}${symbol ? ` ${symbol}` : ""}`;
}