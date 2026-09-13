/**
 * Zero-network-cost stand-in for the Higgsfield cinematic render. Rendered
 * inline (no image request) so the visualizer never shows a broken
 * image/video while a real asset hasn't been generated yet.
 */
export function BottlePlaceholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-ink to-black">
      <svg
        viewBox="0 0 400 600"
        className="absolute inset-0 h-full w-full opacity-80"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a4a5c" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#1c2733" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0a0a0b" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#c8a86a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#c8a86a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="600" fill="url(#glow)" />
        <rect x="165" y="80" width="70" height="28" rx="4" fill="#8f8f94" />
        <rect
          x="150"
          y="108"
          width="100"
          height="260"
          rx="14"
          fill="url(#glass)"
          stroke="#c8a86a"
          strokeOpacity="0.35"
        />
        <rect x="140" y="360" width="120" height="16" rx="3" fill="#111114" />
      </svg>
    </div>
  );
}
