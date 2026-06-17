// import StatCard from "@/components/admin/StatCard";
// import { prisma } from "@/lib/prisma";

// export default async function AdminDashboard() {
//   const stores = await prisma.store.findMany();

//   // CALCULATED METRICS
//   const totalStores = stores.length;
//   const pendingStores = stores.filter(
//     (s) => !s.logoUrl || !s.bannerColor,
//   ).length;
//   const recentSignups = stores.filter(
//     (s) => new Date(s.createdAt) > new Date(Date.now() - 86400000),
//   ).length;

//   return (
//     <div className="p-8 space-y-8">
//       {/* 1. KEY PERFORMANCE INDICATORS */}
//       <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard title="Total Tenants" value={totalStores} />
//         <StatCard title="Pending Onboarding" value={pendingStores} urgent />
//         <StatCard title="New Signups (24h)" value={recentSignups} />
//       </section>

//       {/* 2. OPERATIONAL WIDGETS */}
//       {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <RecentActivityLog />
//         <SystemAlerts />
//       </section> */}
//     </div>
//   );
// }

import StatCard from "@/components/admin/StatCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stores = await prisma.store.findMany();

  // Helper type based on the actual result of the query
  type Store = (typeof stores)[number];

  const totalStores = stores.length;

  // Use the local type alias 'Store' to define the parameter
  const pendingStores = stores.filter(
    (s: Store) => !s.logoUrl || !s.bannerColor,
  ).length;

  const recentSignups = stores.filter(
    (s: Store) => new Date(s.createdAt) > new Date(Date.now() - 86400000),
  ).length;

  return (
    <div className="p-8 space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Tenants" value={totalStores} />
        <StatCard title="Pending Onboarding" value={pendingStores} urgent />
        <StatCard title="New Signups (24h)" value={recentSignups} />
      </section>
    </div>
  );
}
