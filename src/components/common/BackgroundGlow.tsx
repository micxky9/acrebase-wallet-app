export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Main purple glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-600/20
          blur-[140px]
        "
      />

      {/* Top left glow */}
      <div
        className="
          absolute
          -left-40
          -top-40
          h-[400px]
          w-[400px]
          rounded-full
          bg-purple-600/20
          blur-[120px]
        "
      />

      {/* Bottom right glow */}
      <div
        className="
          absolute
          -bottom-40
          -right-40
          h-[450px]
          w-[450px]
          rounded-full
          bg-indigo-600/20
          blur-[130px]
        "
      />

      {/* Subtle grid */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:50px_50px]
          opacity-20
        "
      />

    </div>
  );
}