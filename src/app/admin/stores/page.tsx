export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import StoreTable from "@/components/admin/StoreTable";

export default async function ManageStoresPage() {
  const stores = await prisma.store.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-black mb-6">Store Management Dashboard</h1>
      <StoreTable stores={stores} />
    </div>
  );
}
