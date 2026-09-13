import type { FragranceNotes } from "@/types/product";

const rows: { label: string; key: keyof FragranceNotes }[] = [
  { label: "Salida", key: "top" },
  { label: "Corazón", key: "heart" },
  { label: "Fondo", key: "base" },
];

export function NotesPyramid({ notes }: { notes: FragranceNotes }) {
  return (
    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {rows.map(({ label, key }) => (
        <div key={key} className="border-t border-gold/30 pt-4">
          <dt className="text-[11px] tracking-[0.25em] text-gold uppercase">
            {label}
          </dt>
          <dd className="mt-2 text-sm leading-relaxed text-porcelain/90">
            {notes[key].join(" · ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}
