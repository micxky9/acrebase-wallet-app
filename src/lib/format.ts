export function formatToken(
  value: bigint,
  decimals: number
) {
  const divisor = BigInt(10) ** BigInt(decimals);

  const whole = value / divisor;

  const fraction = value % divisor;

  const fractionString = fraction
    .toString()
    .padStart(decimals, "0")
    .slice(0, 2);

  return `${whole}.${fractionString}`;
}