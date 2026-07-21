import BackgroundGlow from "@/components/common/BackgroundGlow";
import StarsBackground from "@/components/common/StarsBackground";
import RedirectIfConnected from "@/components/common/RedirectIfConnected";
import Logo from "@/components/common/Logo";
import WalletButton from "@/components/common/WalletButton";
import SupportedWallets from "@/components/common/SupportedWallets";
import { Card } from "@/components/ui/card";
import AnimatedCard from "@/components/common/AnimatedCard";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070710] px-6 py-10">
      <RedirectIfConnected />

      <BackgroundGlow />
      <StarsBackground />
      <Logo />
<AnimatedCard>     
     {/* Outer Glow */}
        <div className="absolute -inset-1 rounded-[34px] bg-linear-to-r from-violet-600/20 via-fuchsia-500/10 to-violet-600/20 blur-xl" />

        <Card
          className="
            relative
            overflow-hidden
            rounded-4xl
            border border-white/10
            bg-[#151125]/65
            p-14
            backdrop-blur-3xl
            shadow-[0_20px_80px_rgba(0,0,0,0.45)]
          "
        >
          {/* Glass Highlight */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-4xl
              border
              border-white/5
              bg-linear-to-b
              from-white/5
              via-transparent
              to-transparent
            "
          />

          <div className="relative z-10 text-center">
            <p
              className="
                mb-4
                inline-flex
                rounded-full
                border
                border-violet-400/20
                bg-violet-500/10
                px-4
                py-2
                text-sm
                font-medium
                tracking-wide
                text-violet-300
                backdrop-blur-xl
              "
            >
              Web3. Made Simple.
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              Connect your{" "}
              <span className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                wallet
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">
              Connect your wallet to access your assets, purchase tokens,
              and securely manage transfers on Base Sepolia.
            </p>

            <div className="mt-14">
              <WalletButton />
            </div>

            <p className="mt-6 text-sm leading-6 text-gray-500">
              By connecting, you agree to our{" "}
              <span className="cursor-pointer text-violet-400 transition hover:text-violet-300">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="cursor-pointer text-violet-400 transition hover:text-violet-300">
                Privacy Policy
              </span>
            </p>

            <div className="mt-10">
              <SupportedWallets />
            </div>
          </div>
        </Card>
</AnimatedCard>
    </main>
  );
}