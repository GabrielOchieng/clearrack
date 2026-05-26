"use client";

import { useState } from "react";
import { ArrowRight, Layers, CheckCircle2 } from "lucide-react";

export default function WorkspaceForm() {
  const [storeName, setStoreName] = useState("");
  const [slug, setSlug] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setStoreName(name);
    setSlug(
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, ""),
    );
  };

  const handleSlugManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ""));
  };

  return (
    <div className="bg-brand-surface border border-brand-border p-8 rounded-3xl shadow-xl shadow-stone-200/50 w-full max-w-md mx-auto">
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
  );
}
