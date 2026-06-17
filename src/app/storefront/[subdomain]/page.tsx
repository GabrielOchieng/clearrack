// import { notFound } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import { safeDbQuery } from "@/lib/db-utils";
// import HeroSlider from "@/components/stores/HeroSlider";
// import NotificationBanner from "@/components/pwa/NotificationBanner";
// import ProductCard from "@/components/stores/ProductCard";

// interface StorefrontProps {
//   params: Promise<{ subdomain: string }>;
// }

// export default async function StorefrontPage({ params }: StorefrontProps) {
//   const resolvedParams = await params;
//   const tenantSlug = resolvedParams.subdomain;

//   // 1. Fetch Store and its specific Products
//   const store = await safeDbQuery(() =>
//     prisma.store.findFirst({
//       where: { OR: [{ slug: tenantSlug }, { domain: tenantSlug }] },
//       include: {
//         products: {
//           where: { isSold: false },
//           include: { category: true }, // Added category inclusion for your ProductCard
//           orderBy: { createdAt: "desc" },
//         },
//       },
//     }),
//   );

//   if (!store) notFound();

//   return (
//     <main className="min-h-screen bg-stone-50 antialiased">
//       {/* Dynamic Header (Merged logic) */}
//       <header
//         className="w-full text-white py-14 px-6 text-center"
//         style={{ backgroundColor: store.bannerColor || "#1c1917" }}
//       >
//         <h1 className="text-3xl font-black uppercase tracking-tight">
//           {store.name}
//         </h1>
//       </header>

//       {/* Legacy UI Components */}
//       <HeroSlider />
//       <NotificationBanner />
//       {/* <TrustSignals /> */}

//       <section className="px-6 py-12 max-w-7xl mx-auto">
//         <div className="mb-12 flex justify-between items-end gap-6">
//           <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
//             {store.name}'s Picks
//           </h2>
//           <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-4 py-2 rounded-full">
//             {store.products.length} Items In Stock
//           </span>
//         </div>

//         {/* The Grid using your ProductCard component */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
//           {store.products.map((product) => (
//             <ProductCard
//               key={product.id}
//               id={product.id}
//               name={product.name}
//               price={product.price}
//               size={product.size}
//               // Optional chaining if category isn't always present
//               categoryName={product.category?.name || "Uncategorized"}
//               image={product.images[0]}
//               // videoUrl={product.videoUrl || ""}
//               isSold={product.isSold}
//             />
//           ))}
//         </div>

//         {/* Empty State */}
//         {store.products.length === 0 && (
//           <div className="text-center py-24 border-2 border-dashed border-zinc-200 rounded-2xl">
//             <p className="text-zinc-400 font-medium">
//               The rack is currently clear.
//             </p>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { safeDbQuery } from "@/lib/db-utils";
import HeroSlider from "@/components/stores/HeroSlider";
import NotificationBanner from "@/components/pwa/NotificationBanner";
import ProductCard from "@/components/stores/ProductCard";

// 1. SELF-CONTAINED TYPE DEFINITION
// This defines exactly what we expect from the DB query,
// independent of Prisma's generated types.
interface StoreData {
  id: string;
  name: string;
  bannerColor: string | null;
  products: Array<{
    id: string;
    name: string;
    price: number;
    size: string;
    images: string[];
    isSold: boolean;
    category: { name: string } | null;
  }>;
}

interface StorefrontProps {
  params: Promise<{ subdomain: string }>;
}

export default async function StorefrontPage({ params }: StorefrontProps) {
  const resolvedParams = await params;
  const tenantSlug = resolvedParams.subdomain;

  // 2. QUERY WITH EXPLICIT TYPE CASTING
  // This satisfies TypeScript without relying on external modules.
  const store = (await safeDbQuery(() =>
    prisma.store.findFirst({
      where: { OR: [{ slug: tenantSlug }, { domain: tenantSlug }] },
      include: {
        products: {
          where: { isSold: false },
          include: { category: true },
          orderBy: { createdAt: "desc" },
        },
      },
    }),
  )) as StoreData | null;

  if (!store) notFound();

  return (
    <main className="min-h-screen bg-stone-50 antialiased">
      {/* 3. SAFE ACCESS */}
      <header
        className="w-full text-white py-14 px-6 text-center"
        style={{ backgroundColor: store.bannerColor || "#1c1917" }}
      >
        <h1 className="text-3xl font-black uppercase tracking-tight">
          {store.name}
        </h1>
      </header>

      <HeroSlider />
      <NotificationBanner />

      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-12 flex justify-between items-end gap-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
            {store.name}'s Picks
          </h2>
          <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-4 py-2 rounded-full">
            {store.products.length} Items In Stock
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
          {store.products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              size={product.size}
              categoryName={product.category?.name || "Uncategorized"}
              image={product.images[0]}
              isSold={product.isSold}
            />
          ))}
        </div>

        {store.products.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed border-zinc-200 rounded-2xl">
            <p className="text-zinc-400 font-medium">
              The rack is currently clear.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
