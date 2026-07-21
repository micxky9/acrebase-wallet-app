import BackgroundGlow from "@/components/common/BackgroundGlow";
import Logo from "@/components/common/Logo";
import WalletButton from "@/components/common/WalletButton";
import SupportedWallets from "@/components/common/SupportedWallets";
import { Card } from "@/components/ui/card";
import Footer from "@/components/common/footer";
import FadeIn from "@/components/common/FadeIn";
import RedirectIfConnected from "@/components/common/RedirectIfConnected";


export default function Home() {
  return (
<main className="relative flex min-h-screen items-center justify-center bg-[#070710] px-6">
 <RedirectIfConnected />
    <BackgroundGlow />
      <Logo />
      <div className="absolute inset-0 overflow-hidden">
  <div className="absolute left-[10%] top-[15%] h-1 w-1 rounded-full bg-white opacity-70" />
  <div className="absolute left-[25%] top-[8%] h-1 w-1 rounded-full bg-white opacity-60" />
  <div className="absolute left-[70%] top-[18%] h-1 w-1 rounded-full bg-white opacity-80" />
  <div className="absolute left-[82%] top-[10%] h-1 w-1 rounded-full bg-white opacity-70" />
  <div className="absolute left-[60%] top-[35%] h-1 w-1 rounded-full bg-white opacity-60" />
  <div className="absolute left-[18%] top-[40%] h-1 w-1 rounded-full bg-white opacity-50" />
  <div className="absolute left-[88%] top-[50%] h-1 w-1 rounded-full bg-white opacity-70" />
</div>
<FadeIn>
<Card className="relative z-10 w-full max-w-190 rounded-4xl bg-[#151125]/70 p-14 backdrop-blur-3xl">
     <div className="mt-10 text-center">
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
       <p className="mt-6 text-center text-sm leading-6 text-gray-500">
  By connecting, you agree to our{" "}
  <span className="cursor-pointer text-violet-400 hover:text-violet-300">
    Terms of Service
  </span>{" "}
  and{" "}
  <span className="cursor-pointer text-violet-400 hover:text-violet-300">
    Privacy Policy
  </span>

</p>

<SupportedWallets />

<Footer />
        </div>
     </Card>
     </FadeIn>
    </main>
  );
}