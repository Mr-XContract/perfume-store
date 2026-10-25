/**
 * Marcador de posición hasta tener fotos reales del proveedor / vídeo de
 * demostración. Sustituir por <Image> con las fotos finales.
 */
export function ProductVisual({ label = "Foto del producto" }: { label?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex aspect-square w-full items-center justify-center rounded-3xl bg-sand"
    >
      <svg viewBox="0 0 120 120" className="h-2/5 w-2/5 text-moss/60" fill="currentColor" aria-hidden>
        <ellipse cx="60" cy="78" rx="26" ry="22" />
        <ellipse cx="24" cy="48" rx="11" ry="15" />
        <ellipse cx="46" cy="30" rx="11" ry="15" />
        <ellipse cx="74" cy="30" rx="11" ry="15" />
        <ellipse cx="96" cy="48" rx="11" ry="15" />
      </svg>
    </div>
  );
}
