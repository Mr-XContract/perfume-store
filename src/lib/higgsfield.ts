import "server-only";

/**
 * Server-side integration with Higgsfield AI.
 *
 * Pattern: generation is expensive (seconds-to-minutes) and billed per job,
 * so we NEVER call Higgsfield from the client or on every request. Instead:
 *
 *  1. A generation is kicked off out-of-band (a script, an admin action, or
 *     a queue worker) and its `jobId` is stored next to the product (see
 *     src/data/products.ts -> cinematic.higgsfieldJobId).
 *  2. At build/request time, this module resolves that job to a final,
 *     CDN-hosted video URL and caches the result (`next: { revalidate }`),
 *     so page renders never block on Higgsfield's API.
 *  3. Once a job is finalized, download the asset and self-host it under
 *     /public (or your own CDN/bucket) and store that URL directly on the
 *     product instead of re-resolving the job on every build — see
 *     "Buenas prácticas de performance" in the README for why.
 *
 * Required env vars (.env.local, never committed):
 *   HIGGSFIELD_API_BASE_URL   - your Higgsfield workspace API base URL
 *   HIGGSFIELD_API_KEY        - server-side secret, from the Higgsfield dashboard
 */

interface HiggsfieldJobStatusResponse {
  id: string;
  status: "queued" | "processing" | "completed" | "failed";
  output?: {
    videoUrl: string;
    posterUrl: string;
    width: number;
    height: number;
    durationMs: number;
  };
  error?: string;
}

export interface ResolvedCinematicAsset {
  status: HiggsfieldJobStatusResponse["status"];
  videoUrl: string | null;
  posterUrl: string | null;
}

/**
 * Resolves a Higgsfield job id to a playable asset. Safe to call from a
 * Server Component or Route Handler. Falls back gracefully (status
 * "failed" + nulls) if credentials are missing or the job errored, so a
 * missing/expired generation never breaks the page.
 */
export async function resolveHiggsfieldAsset(
  jobId: string,
): Promise<ResolvedCinematicAsset> {
  const baseUrl = process.env.HIGGSFIELD_API_BASE_URL;
  const apiKey = process.env.HIGGSFIELD_API_KEY;

  if (!baseUrl || !apiKey) {
    return { status: "failed", videoUrl: null, posterUrl: null };
  }

  try {
    const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      // Revalidate periodically instead of on every request; once a job is
      // "completed" you'd normally stop polling it entirely (see note above).
      next: { revalidate: 3600, tags: [`higgsfield-job-${jobId}`] },
    });

    if (!res.ok) {
      return { status: "failed", videoUrl: null, posterUrl: null };
    }

    const data = (await res.json()) as HiggsfieldJobStatusResponse;

    return {
      status: data.status,
      videoUrl: data.output?.videoUrl ?? null,
      posterUrl: data.output?.posterUrl ?? null,
    };
  } catch {
    return { status: "failed", videoUrl: null, posterUrl: null };
  }
}
