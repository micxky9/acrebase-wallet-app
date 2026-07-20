export default function BackgroundGlow() {
  return (
    <>
      {/* Top ambient glow */}
      <div className="absolute left-1/2 top-0 h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

      {/* Left glow */}
      <div className="absolute -left-45 top-1/3 h-75 w-75 rounded-full bg-violet-500/10 blur-[150px]" />

      {/* Right glow */}
      <div className="absolute -right-45 top-1/3 h-75 w-75 rounded-full bg-fuchsia-500/10 blur-[150px]" />

      {/* Horizon */}
      <div className="absolute -bottom-82.5 left-1/2 h-175 w-325 -translate-x-1/2 rounded-full border border-violet-500/20 bg-linear-to-t from-violet-600/30 via-violet-500/10 to-transparent blur-sm" />
    </>
  );
}