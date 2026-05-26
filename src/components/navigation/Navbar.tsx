import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full bg-brand-surface border-b border-brand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 bg-brand-primary rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md shadow-brand-primary/20">
            CR
          </div>
          <span className="font-black text-xl tracking-tight uppercase text-brand-primary">
            ClearRack
          </span>
        </div>
        <Link
          href="/dashboard"
          className="text-xs font-bold tracking-wider text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white uppercase px-4 py-2 rounded-lg transition-all duration-200"
        >
          Merchant Console
        </Link>
      </div>
    </header>
  );
}
