import { Icon } from "@iconify/react";

export default function SupportedWallets() {
  return (
    <div className="mt-12 flex flex-col items-center">
      <p className="mb-6 text-xs uppercase tracking-[0.25em] text-gray-500">
        Supported Wallets
      </p>

      <div className="flex gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/3 transition hover:border-violet-500/40 hover:bg-white/6">
          <Icon icon="logos:metamask-icon" className="h-8 w-8" />
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/3 transition hover:border-violet-500/40 hover:bg-white/6">
          <Icon icon="simple-icons:walletconnect" className="h-8 w-8 text-[#3B99FC]" />
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/3 transition hover:border-violet-500/40 hover:bg-white/6">
          <Icon icon="simple-icons:trustwallet" className="h-8 w-8 text-[#3375BB]" />
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/3 transition hover:border-violet-500/40 hover:bg-white/6">
          <Icon icon="lucide:plus" className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
}