"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Smartphone,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const [storeName, setStoreName] = useState("");
  const [slug, setSlug] = useState("");

  // Clean and generate slugs systematically from the Brand Name input field
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setStoreName(name);
    setSlug(
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Turn spaces and special characters to dashes
        .replace(/(^-|-$)+/g, ""), // Trim dangling leading or trailing dashes
    );
  };

  // Ensure direct manual changes to the handle address input stay safe and valid
  const handleSlugManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const manualValue = e.target.value;
    setSlug(
      manualValue.toLowerCase().replace(/[^a-z0-9-]+/g, ""), // Intercept raw invalid values or spaces on the fly
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg text-foreground font-sans antialiased flex flex-col justify-between selection:bg-brand-primary selection:text-white">
      {/* Marketplace Header Navigation */}
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

      {/* Main Marketing Hero Arena */}
      <main className="w-full max-w-7xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1">
        {/* Left Informational Content */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 bg-orange-50 border border-brand-primary/30 text-brand-primary px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
            Active Inventory Infrastructure
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight leading-[1.05] uppercase">
            Clear your racks. <br />
            <span className="text-brand-primary">Turn over cash.</span>
          </h1>
          <p className="max-w-xl text-sm sm:text-base text-brand-muted font-medium leading-relaxed mx-auto lg:mx-0">
            Stop forcing massive, clunky generic templates to hold unique
            vintage or boutique capsules. Drop phone video previews, serialize
            rare pieces, and process checkout streams instantly.
          </p>

          {/* Core Marketplace Attributes */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0 text-left">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-primary">
                <Smartphone className="h-4 w-4" />
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900">
                  Video-First
                </h4>
              </div>
              <p className="text-[12px] text-brand-muted font-medium leading-normal">
                Optimized phone media encoding displays product texture
                flawlessly.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-primary">
                <Zap className="h-4 w-4" />
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900">
                  1-of-1 Logic
                </h4>
              </div>
              <p className="text-[12px] text-brand-muted font-medium leading-normal">
                Automated archival locks double-booking risks immediately.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-primary">
                <Layers className="h-4 w-4" />
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900">
                  Deploy Link
                </h4>
              </div>
              <p className="text-[12px] text-brand-muted font-medium leading-normal">
                Claim business subdomains securely on our routing array.
              </p>
            </div>
          </div>
        </div>

        {/* Right Action Registration Form Card */}
        <div className="lg:col-span-5 bg-brand-surface border border-brand-border p-8 rounded-3xl shadow-xl shadow-stone-200/50 w-full max-w-md mx-auto">
          <div className="h-11 w-11 bg-orange-50 border border-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary mb-5">
            <Layers className="h-5 w-5" />
          </div>

          <h2 className="text-xl font-black text-stone-900 tracking-tight uppercase">
            Claim Your Workspace
          </h2>
          <p className="text-xs text-brand-muted font-semibold mt-1">
            Deploy your dedicated brand storefront space in seconds.
          </p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-stone-700 uppercase tracking-wider ml-0.5">
                Boutique / Brand Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={handleNameChange}
                placeholder="e.g. Lyvera Outlets"
                className="w-full bg-white border border-brand-border p-3.5 rounded-xl outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary font-medium text-sm transition-all placeholder:text-stone-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-stone-700 uppercase tracking-wider ml-0.5">
                Storefront Web Address
              </label>
              <div className="flex items-center w-full bg-white border border-brand-border rounded-xl overflow-hidden px-3.5 focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all">
                <input
                  type="text"
                  value={slug}
                  onChange={handleSlugManualChange}
                  placeholder="handle"
                  className="bg-transparent py-3.5 outline-none font-bold text-brand-primary text-sm w-1/2 placeholder:text-stone-300"
                />
                <span className="text-stone-400 font-bold text-xs text-right w-1/2 truncate">
                  .clearrackapp.com
                </span>
              </div>
            </div>

            {slug && (
              <div className="flex items-center gap-2.5 text-orange-700 bg-orange-50/60 border border-brand-primary/20 p-3 rounded-lg transition-all">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-primary" />
                <p className="text-[12px] font-bold tracking-tight">
                  Ready to deploy:{" "}
                  <span className="underline font-black text-stone-900">
                    {slug}.clearrackapp.com
                  </span>
                </p>
              </div>
            )}

            {/* Re-Architected High-Visibility Dynamic Action Button */}
            <button
              type="submit"
              disabled={!slug}
              className={`w-full font-black text-xs tracking-widest uppercase py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 mt-3 shadow-lg ${
                slug
                  ? "bg-brand-primary text-white hover:bg-orange-600 active:scale-[0.99] cursor-pointer shadow-brand-primary/20"
                  : "bg-stone-200 text-stone-400 opacity-50 cursor-not-allowed shadow-none"
              }`}
            >
              Launch Storefront <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </main>

      {/* Footer Area */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-5 text-center lg:text-left border-t border-brand-border text-[11px] text-brand-muted font-medium">
        &copy; {new Date().getFullYear()} ClearRack Core Platforms. All Rights
        Reserved.
      </footer>
    </div>
  );
}
