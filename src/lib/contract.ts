import { CONTRACTS } from "@/constants/contracts";

import { usdtAbi } from "@/abi/usdt";
import { acreAbi } from "@/abi/acre";
 import { plotAbi } from "@/abi/plot";
import { yardAbi } from "@/abi/yard";

export const contracts = {
  usdt: {
    address: CONTRACTS.USDT,
    abi: usdtAbi,
  },

  acre: {
    address: CONTRACTS.ACRE,
    abi: acreAbi,
  },

  plot: {
    address: CONTRACTS.PLOT,
    abi: plotAbi,
  },

  yard: {
    address: CONTRACTS.YARD,
    abi: yardAbi,
  },
} as const;