// import { notFound } from "next/navigation";
// import Image from "next/image";
// import { prisma } from "@/lib/prisma";

// interface StorefrontProps {
//   // Ensure this EXACTLY matches your dynamic folder segment folder naming token: [subdomain]
//   params: Promise<{ subdomain: string }>;
// }

// export default async function StorefrontPage({ params }: StorefrontProps) {
//   // 1. Resolve the async route param tuple cleanly
//   const resolvedParams = await params;
//   const tenantSlug = resolvedParams.subdomain;

//   console.log(
//     `🔍 [Database Fetch] Searching Neon for store slug: ${tenantSlug}`,
//   );

//   // 2. Match the dynamic slug string against your Neon database column record
//   const store = await prisma.store.findFirst({
//     where: {
//       OR: [{ slug: tenantSlug }, { domain: tenantSlug }],
//     },
//     include: {
//       products: {
//         where: { isSold: false },
//         orderBy: { createdAt: "desc" },
//       },
//     },
//   });

//   console.log("🔍 [DEBUG STORE OBJECT]:", JSON.stringify(store, null, 2));

//   // 3. Fail-fast if the workspace handle doesn't exist in the database rows
//   if (!store) {
//     console.log(
//       `❌ [Database Fetch] No store record found matching: ${tenantSlug}`,
//     );
//     notFound();
//   }

//   return (
//     <main className="min-h-screen bg-stone-50 select-none antialiased">
//       {/* Dynamic Customizable Merchant Header */}
//       <header
//         className="w-full text-white py-14 px-6 text-center shadow-sm"
//         style={{ backgroundColor: store?.bannerColor || "#1c1917" }}
//       >
//         <div className="max-w-4xl mx-auto space-y-3">
//           {/* Safe string validation logic check to catch NULL database fields */}
//           {store?.logoUrl && store.logoUrl.trim() !== "" ? (
//             <div className="relative h-16 w-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white/20 bg-white">
//               <Image
//                 src={store.logoUrl}
//                 alt={store.name || "Store Logo"}
//                 fill
//                 className="object-contain"
//               />
//             </div>
//           ) : (
//             <div className="h-12 w-12 mx-auto mb-1 rounded-xl bg-white/10 flex items-center justify-center font-black text-sm tracking-tighter uppercase border border-white/20">
//               {(store?.name || "ST").substring(0, 2)}
//             </div>
//           )}

//           <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
//             {store?.name || "Boutique Storefront"}
//           </h1>
//           <p className="text-[10px] bg-white/20 inline-flex font-black tracking-widest uppercase px-3 py-1 rounded-md backdrop-blur-sm">
//             ⚡ Secure Live Drop Space
//           </p>
//         </div>
//       </header>

//       {/* Product Display Grid Rack */}
//       <section className="max-w-5xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
//           {store?.products?.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white border border-stone-200/80 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
//             >
//               <div>
//                 {/* Product Media Box */}
//                 <div className="aspect-square w-full bg-stone-100 rounded-xl relative overflow-hidden mb-3.5 border border-stone-100">
//                   {product.images?.[0] ? (
//                     <Image
//                       src={product.images[0]}
//                       alt={product.name}
//                       fill
//                       sizes="(max-w-768px) 50vw, 33vw"
//                       className="object-cover"
//                       priority
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs font-bold font-mono">
//                       [ NO IMAGE ]
//                     </div>
//                   )}
//                 </div>

//                 <h3 className="font-black text-sm text-stone-900 tracking-tight leading-snug">
//                   {product.name}
//                 </h3>
//                 {product.description && (
//                   <p className="text-[11px] text-stone-500 font-medium mt-1 line-clamp-2 leading-relaxed">
//                     {product.description}
//                   </p>
//                 )}
//                 <div className="text-[11px] font-bold text-stone-400 mt-2">
//                   Size:{" "}
//                   <span className="text-stone-800 font-black uppercase">
//                     {product.size}
//                   </span>
//                 </div>
//               </div>

//               {/* Action and Conversion Bar */}
//               <div className="mt-4 pt-3 border-t border-stone-100">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-[10px] text-stone-400 font-black uppercase tracking-wider">
//                     Price
//                   </span>
//                   <span className="text-base font-black text-orange-600">
//                     KES {product.price.toLocaleString()}
//                   </span>
//                 </div>

//                 {/* The core click engine leading into your automated M-Pesa STK workflow pipeline */}
//                 <button className="w-full bg-stone-900 hover:bg-orange-600 active:scale-[0.98] text-white text-[11px] font-black py-3 rounded-xl uppercase tracking-wider transition-all duration-150 shadow-sm">
//                   Buy via M-Pesa
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty Inventory State Fallback */}
//         {store?.products?.length === 0 && (
//           <div className="text-center py-24 text-stone-400 space-y-2">
//             <p className="font-black text-sm uppercase tracking-wider">
//               The rack is completely clear
//             </p>
//             <p className="text-xs font-medium text-stone-400 max-w-xs mx-auto">
//               This boutique hasn't dropped any collections yet or everything
//               sold out instantly!
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

interface StorefrontProps {
  params: Promise<{ subdomain: string }>;
}

export default async function StorefrontPage({ params }: StorefrontProps) {
  const resolvedParams = await params;
  const tenantSlug = resolvedParams.subdomain;

  // 1. Fetch Store and its specific Products
  const store = await safeDbQuery(() =>
    prisma.store.findFirst({
      where: { OR: [{ slug: tenantSlug }, { domain: tenantSlug }] },
      include: {
        products: {
          where: { isSold: false },
          include: { category: true }, // Added category inclusion for your ProductCard
          orderBy: { createdAt: "desc" },
        },
      },
    }),
  );

  if (!store) notFound();

  return (
    <main className="min-h-screen bg-stone-50 antialiased">
      {/* Dynamic Header (Merged logic) */}
      <header
        className="w-full text-white py-14 px-6 text-center"
        style={{ backgroundColor: store.bannerColor || "#1c1917" }}
      >
        <h1 className="text-3xl font-black uppercase tracking-tight">
          {store.name}
        </h1>
      </header>

      {/* Legacy UI Components */}
      <HeroSlider />
      <NotificationBanner />
      {/* <TrustSignals /> */}

      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-12 flex justify-between items-end gap-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
            {store.name}'s Picks
          </h2>
          <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-4 py-2 rounded-full">
            {store.products.length} Items In Stock
          </span>
        </div>

        {/* The Grid using your ProductCard component */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
          {store.products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              size={product.size}
              // Optional chaining if category isn't always present
              categoryName={product.category?.name || "Uncategorized"}
              image={product.images[0]}
              // videoUrl={product.videoUrl || ""}
              isSold={product.isSold}
            />
          ))}
        </div>

        {/* Empty State */}
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
