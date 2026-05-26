export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 py-5 text-center lg:text-left border-t border-brand-border text-[11px] text-brand-muted font-medium">
      &copy; {new Date().getFullYear()} ClearRack Core Platforms. All Rights
      Reserved.
    </footer>
  );
}
