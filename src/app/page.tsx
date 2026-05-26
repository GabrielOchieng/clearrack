import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import WorkspaceForm from "@/components/WorkspaceForm";
import { Smartphone, Zap, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg text-foreground font-sans antialiased flex flex-col justify-between selection:bg-brand-primary selection:text-white">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1">
        {/* Left Side Presentation Content Block */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 bg-orange-50 border border-brand-primary/30 text-brand-primary px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
            Fast M-Pesa Checkout & Stock Control
          </span>

          <h1 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight leading-[1.05] uppercase">
            Clear your racks. <br />
            <span className="text-brand-primary">
              Turn stock into instant cash.
            </span>
          </h1>

          <p className="max-w-xl text-sm sm:text-base text-brand-muted font-medium leading-relaxed mx-auto lg:mx-0">
            Stop struggling with slow websites or mixed-up WhatsApp DMs when
            launching your latest stock drops or unique items. Share quick video
            previews, block double-booking seamlessly, and receive customer
            payments instantly via M-Pesa.
          </p>

          {/* Atomic Render Grid Loop */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0 text-left">
            <FeatureCard
              icon={Smartphone}
              title="Video-First"
              description="Optimized phone media encoding displays product texture flawlessly."
            />
            <FeatureCard
              icon={Zap}
              title="1-of-1 Logic"
              description="Automated archival locks double-booking risks immediately."
            />
            <FeatureCard
              icon={Layers}
              title="Deploy Link"
              description="Claim business subdomains securely on our routing array."
            />
          </div>
        </div>

        {/* Right Side Input Action Interactive Form */}
        <div className="lg:col-span-5 w-full">
          <WorkspaceForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
