import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-surface/80 backdrop-blur-md border-b border-brand-border/60 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 bg-brand-primary rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md shadow-brand-primary/20">
            CR
          </div>
          <span className="font-black text-xl tracking-tight uppercase text-stone-900 select-none">
            ClearRack<span className="text-brand-primary">.</span>
          </span>
        </div>

        {/* Center: Added Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase font-bold tracking-wider text-brand-muted">
          <Link
            href="#features"
            className="hover:text-brand-primary transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="#solutions"
            className="hover:text-brand-primary transition-colors duration-200"
          >
            Solutions
          </Link>
          <Link
            href="#changelog"
            className="hover:text-brand-primary transition-colors duration-200"
          >
            Changelog
          </Link>
          <Link
            href="#docs"
            className="hover:text-brand-primary transition-colors duration-200"
          >
            Developer API
          </Link>
        </nav>

        {/* Right Side: Primary CTA Action */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-xs font-bold tracking-wider text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white uppercase px-4 py-2 rounded-lg transition-all duration-200"
          >
            Merchant Console
          </Link>
        </div>
      </div>
    </header>
  );
}
