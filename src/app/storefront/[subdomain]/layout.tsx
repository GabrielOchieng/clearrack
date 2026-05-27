import React from "react";
import "../../globals.css"; // Ensure your global styles are imported here

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="w-full min-h-screen bg-stone-50">
          {/* Distraction-free container shell */}
          {children}
        </div>
      </body>
    </html>
  );
}
