export default function BackgroundGlow() {
  return (
    <>
      <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[160px]" />

      <div className="absolute bottom- -62.5 left-1/2 h-150 w-225 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]" />
    </>
  );
}