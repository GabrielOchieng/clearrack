import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  urgent?: boolean;
}

export default function StatCard({ title, value, urgent }: StatCardProps) {
  return (
    <div
      className={`p-6 rounded-xl border ${urgent ? "border-amber-900 bg-amber-950/20" : "border-stone-800 bg-stone-900"}`}
    >
      <h3 className="text-stone-400 text-xs uppercase tracking-widest font-bold mb-2">
        {title}
      </h3>
      <p
        className={`text-3xl font-black ${urgent ? "text-amber-400" : "text-white"}`}
      >
        {value}
      </p>
    </div>
  );
}
