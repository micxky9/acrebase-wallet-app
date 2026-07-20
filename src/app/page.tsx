import BackgroundGlow from "@/components/common/BackgroundGlow";
import Logo from "@/components/common/Logo";
import WalletButton from "@/components/common/WalletButton";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080811] px-6">
      <BackgroundGlow />

      <section className="relative z-10 flex w-full max-w-xl flex-col items-center rounded-3xl border border-white/10 bg-black/30 p-10 backdrop-blur-xl">
        <Logo />

        <div className="mt-16 text-center">
          <p className="mb-4 inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            Web3. Made Simple.
          </p>

          <h1 className="mt-6 text-5xl font-bold text-white">
            Connect your{" "}
            <span className="text-violet-500">wallet</span>
          </h1>

          <p className="mt-6 text-lg text-gray-400">
            Connect your wallet to access your tokens, purchase assets,
            and transfer with ease.
          </p>
        </div>

        <div className="mt-12 w-full">
          <WalletButton />
        </div>
      </section>
    </main>
  );
}