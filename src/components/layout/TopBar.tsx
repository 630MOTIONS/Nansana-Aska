export default function TopBar() {
  return (
    <div className="bg-brand-blue text-white">
      <div className="mx-auto flex w-full max-w-site items-center justify-between gap-4 px-4 py-2 text-label font-semibold uppercase tracking-wide">
        <p>Official Club Portal &bull; Uganda Futsal Super League</p>
        <p className="hidden gap-3 sm:flex">
          <span className="text-gold-soft">FAU &bull; Futsal Super League</span>
          <span className="font-normal normal-case text-white/80">
            Wakiso District, Uganda
          </span>
        </p>
      </div>
    </div>
  );
}
