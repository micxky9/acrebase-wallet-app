import { CONTRACTS } from "@/constants/contracts";

import { usdtAbi } from "@/abi/usdt";
import { acreAbi } from "@/abi/acre";
import { plotAbi } from "@/abi/plot";
import { yardAbi } from "@/abi/yard";

export const contracts = {
  usdt: {
    address: CONTRACTS.USDT as `0x${string}`,
    abi: usdtAbi,
  },

  acre: {
    address: CONTRACTS.ACRE as `0x${string}`,
    abi: acreAbi,
  },

  plot: {
    address: CONTRACTS.PLOT as `0x${string}`,
    abi: plotAbi,
  },

  yard: {
    address: CONTRACTS.YARD as `0x${string}`,
    abi: yardAbi,
  },
};