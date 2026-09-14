import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

export const dynamic = "force-dynamic";

type RsvpRow = {
  id: string;
  name: string | null;
  guest_count: number | null;
  message: string | null;
  attending: boolean;
  created_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminRsvpPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data, error } = await supabase
    .from("rsvps")
    .select("id, name, guest_count, message, attending, created_at")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as RsvpRow[];
  const confirmed = rows.filter((r) => r.attending);
  const declined = rows.filter((r) => !r.attending);
  const totalGuests = confirmed.reduce(
    (sum, r) => sum + (r.guest_count ?? 0),
    0
  );

  return (
    <main className="min-h-[100svh] bg-cream px-5 py-14 sm:px-10">
      <div className="mx-auto max-w-[760px]">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm tracking-[.12em] text-mauve">RSVP</p>
            <p className="font-display text-[30px] italic tracking-[-0.01em] text-wine">
              Confirmations
            </p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-olive-dark/25 px-5 py-2 text-[12px] tracking-[.12em] text-olive-dark transition-colors hover:bg-olive-dark hover:text-paper"
            >
              SIGN OUT
            </button>
          </form>
        </div>

        {error && (
          <p className="mb-6 rounded-lg border border-wine/30 bg-wine/5 px-4 py-3 text-[14px] text-wine">
            Couldn&apos;t load RSVPs: {error.message}
          </p>
        )}

        <div className="mb-10 grid grid-cols-3 gap-3 sm:gap-5">
          <Stat label="Confirmed" value={confirmed.length} />
          <Stat label="Declined" value={declined.length} />
          <Stat label="Total Guests" value={totalGuests} />
        </div>

        <section className="mb-10">
          <p className="mb-4 font-serif text-xl italic text-wine">
            Confirmed Guests
          </p>
          {confirmed.length === 0 ? (
            <p className="text-[14px] text-ink/60">No confirmations yet.</p>
          ) : (
            <div className="space-y-3">
              {confirmed.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-olive-dark/15 bg-paper/70 px-5 py-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-[16px] text-ink">{r.name}</p>
                    <p className="text-[13px] text-olive-dark/70">
                      {r.guest_count} {r.guest_count === 1 ? "Guest" : "Guests"}
                    </p>
                  </div>
                  {r.message && (
                    <p className="mt-1.5 text-[14px] italic text-ink/75">
                      &ldquo;{r.message}&rdquo;
                    </p>
                  )}
                  <p className="mt-2 text-[12px] tracking-[.04em] text-mauve">
                    Confirmed {formatDate(r.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <p className="mb-4 font-serif text-xl italic text-wine">
            Declined Guests
          </p>
          {declined.length === 0 ? (
            <p className="text-[14px] text-ink/60">No declines yet.</p>
          ) : (
            <div className="space-y-3">
              {declined.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between rounded-xl border border-olive-dark/10 bg-paper/40 px-5 py-3"
                >
                  <p className="text-[14px] text-ink/70">Declined</p>
                  <p className="text-[12px] tracking-[.04em] text-mauve">
                    {formatDate(r.created_at)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-olive-dark/15 bg-paper/70 py-5 text-center shadow-sm">
      <p className="font-display text-[28px] font-semibold text-wine">
        {value}
      </p>
      <p className="mt-1 text-[11px] tracking-[.1em] text-olive-dark/70">
        {label.toUpperCase()}
      </p>
    </div>
  );
}
