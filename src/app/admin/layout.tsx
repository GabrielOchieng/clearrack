import React from "react";
import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-950 text-stone-200 antialiased">
        <div className="flex min-h-screen">
          {/* Simple Sidebar Navigation */}
          <aside className="w-64 border-r border-stone-800 p-6">
            <h2 className="text-orange-500 font-black text-sm uppercase tracking-widest mb-8">
              Admin Console
            </h2>
            <nav className="space-y-4">
              <a
                href="/admin"
                className="block text-sm hover:text-brand-primary"
              >
                Dashboard
              </a>
              <a
                href="/admin/stores"
                className="block text-sm hover:text-brand-primary"
              >
                Manage Stores
              </a>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
