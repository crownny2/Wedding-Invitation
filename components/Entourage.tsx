import CornerFloral from "./CornerFloral";
import VineFlourish from "./VineFlourish";

type Group = {
  role: string;
  names: string[];
};

function SprigIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      className={className}
    >
      <path d="M12 21V7" />
      <path d="M12 13c0-4 3-6.5 6.5-7-1 3.5-2 6.5-6.5 7Z" />
      <path d="M12 17c0-3.5-2.5-5.5-5.5-6 .8 3 1.8 5.5 5.5 6Z" />
    </svg>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 20.5s-7.6-4.9-10.2-9.6C.4 8 1.6 4.6 4.9 3.7c2-.5 4 .3 5.1 2 .3.5.7 1.3 2 1.3s1.7-.8 2-1.3c1.1-1.7 3.1-2.5 5.1-2 3.3.9 4.5 4.3 3.1 7.2C19.6 15.6 12 20.5 12 20.5Z" />
    </svg>
  );
}

function DoubleHeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" fill="currentColor" className={className}>
      <path d="M12.5 18S5.8 13.9 3.6 9.9C2.3 7.4 3.3 4.5 6 3.8c1.7-.4 3.4.3 4.3 1.7.3.5.6 1 1.4 1s1.1-.5 1.4-1c.9-1.4 2.6-2.1 4.3-1.7 2.7.7 3.7 3.6 2.4 6.1C17.4 13.9 12.5 18 12.5 18Z" />
      <path d="M20 16S14.5 12.6 12.7 9.4c-1-1.9-.2-4.2 1.9-4.8 1.4-.4 2.8.2 3.6 1.4.2.4.5.8 1.1.8s.9-.4 1.1-.8c.8-1.2 2.2-1.8 3.6-1.4 2.1.6 2.9 2.9 1.9 4.8C24.1 12.6 20 16 20 16Z" />
    </svg>
  );
}

function Divider() {
  return (
    <div className="my-7 flex items-center justify-center gap-3">
      <span className="h-px w-12 bg-mauve/35 sm:w-20" />
      <HeartIcon className="h-3 w-3 text-mauve/80" />
      <span className="h-px w-12 bg-mauve/35 sm:w-20" />
    </div>
  );
}

function RoleBlock({ group }: { group: Group }) {
  return (
    <div>
      <p className="mb-3 flex items-center justify-center gap-2 font-serif text-2xl italic text-wine sm:text-[27px]">
        <SprigIcon className="h-3.5 w-3.5 shrink-0 rotate-[-45deg] text-mauve/70" />
        {group.role}
        <SprigIcon className="h-3.5 w-3.5 shrink-0 rotate-[135deg] text-mauve/70" />
      </p>
      <div className="text-base leading-relaxed text-ink sm:text-[18px]">
        {group.names.map((n) => (
          <p
            key={n}
            className={`mb-1 ${
              n.includes("·") ? "whitespace-nowrap text-[12px] sm:text-[18px]" : ""
            }`}
          >
            {n}
          </p>
        ))}
      </div>
    </div>
  );
}

function PairRow({ groups }: { groups: [Group, Group] }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 sm:gap-8 sm:divide-x sm:divide-mauve/20">
        <div className="sm:pr-8">
          <RoleBlock group={groups[0]} />
        </div>
        <div className="sm:pl-8">
          <RoleBlock group={groups[1]} />
        </div>
      </div>
      <HeartIcon className="absolute left-1/2 top-1/2 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-mauve sm:block" />
    </div>
  );
}

function SingleRow({ group }: { group: Group }) {
  return (
    <div className="text-center">
      <RoleBlock group={group} />
    </div>
  );
}

export default function Entourage() {
  return (
    <section className="relative overflow-hidden bg-paper py-16 sm:py-20">
      <CornerFloral position="tl" />
      <CornerFloral position="tr" />
      <CornerFloral position="bl" />
      <CornerFloral position="br" />

      <div className="relative z-10">
        <div className="relative mx-auto w-[92vw] max-w-[1600px] rounded-[26px] border border-olive-dark/25 bg-cream/70 px-6 py-12 sm:px-16 lg:px-24">
          <VineFlourish className="absolute bottom-4 left-4 hidden h-20 w-20 text-wine/70 sm:block" />
          <VineFlourish
            flip
            className="absolute bottom-4 right-4 hidden h-20 w-20 text-wine/70 sm:block"
          />

          <div className="relative z-10">
          <SprigIcon className="mx-auto mb-3 h-7 w-7 text-mauve" />
          <p className="text-center font-display text-[36px] font-medium italic tracking-[-0.01em] text-wine sm:text-[46px]">
            Campbell &middot; Blase Nuptials
          </p>
          <div className="mt-4 flex justify-center">
            <span className="rounded-full bg-olive-dark px-6 py-2.5 text-[13px] tracking-[.2em] text-paper">
              Our Entourage
            </span>
          </div>

          <Divider />

          <PairRow
            groups={[
              {
                role: "Parents of the Groom",
                names: ["Mr. Lindsay Campbell", "Mrs. Michelle Campbell"],
              },
              {
                role: "Parents of the Bride",
                names: ["Mr. Walfer G. Blase", "Mrs. Evelyn M. Blase"],
              },
            ]}
          />

          <Divider />

          <SingleRow
            group={{
              role: "Principal Sponsors",
              names: [
                "Mrs. Katy Sandy  ·  Mrs. Dalia Belotindos",
                "Mrs. Ester Hernandez  ·  Mr. Augie Belotindos",
                "Mr. Fryan Abkilan  ·  Mrs. Malou Bowe",
              ],
            }}
          />

          <Divider />

          <PairRow
            groups={[
              { role: "Best Man", names: ["Mr. Fernan Mark Ian Abkilan"] },
              { role: "Maid of Honor", names: ["Ms. Lara Mae Blase"] },
            ]}
          />

          <Divider />

          <PairRow
            groups={[
              {
                role: "Groom's Men",
                names: [
                  "Mr. Darren Lyniel Bermeo",
                  "Mr. Eric Gemina",
                  "Mr. Crown James Cedeño",
                ],
              },
              {
                role: "Bride's Maids",
                names: [
                  "Mrs. Emily Abkilan",
                  "Ms. Jenie Rose Daragon",
                  "Ms. Kimberly Blase",
                ],
              },
            ]}
          />

          <Divider />

          <PairRow
            groups={[
              {
                role: "Candle",
                names: ["Mrs. Aime Jane Braga", "Mr. James Imar Braga"],
              },
              {
                role: "Veil",
                names: ["Mrs. Michelle Blase", "Mr. Wilbert Blase"],
              },
            ]}
          />

          <Divider />

          <SingleRow
            group={{
              role: "Cord",
              names: ["Mrs. Angelica Borinaga  ·  Mr. Abel Borinaga"],
            }}
          />

          <Divider />

          <SingleRow
            group={{ role: "Bible Bearer", names: ["Aizack Matt Braga"] }}
          />

          <Divider />

          <PairRow
            groups={[
              { role: "Coin Bearer", names: ["Jaybrex Blase"] },
              { role: "Ring Bearer", names: ["Al Joseph Torreon"] },
            ]}
          />

          <Divider />

          <SingleRow
            group={{
              role: "Flower Girls",
              names: [
                "Athisa Dominique Belotindos",
                "Aizelle Thea Braga",
                "Jianna Micah Blase",
              ],
            }}
          />

          <div className="mt-9 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-mauve/45 sm:w-20" />
            <DoubleHeartIcon className="h-4 w-6 text-mauve" />
            <span className="h-px w-14 bg-mauve/45 sm:w-20" />
          </div>
          <p className="mt-2 text-center text-xs tracking-[.32em] text-mauve">
            TOGETHER FOREVER
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
