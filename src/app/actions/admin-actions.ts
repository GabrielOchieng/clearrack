"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateStoreDetails(id: string, data: any) {
  try {
    await prisma.store.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        domain: data.domain,
        logoUrl: data.logoUrl,
        bannerColor: data.bannerColor,
      },
    });
    // This forces the dashboard to refetch the fresh data from Neon
    revalidatePath("/admin/stores");
  } catch (error) {
    console.error("Failed to update store:", error);
    throw new Error("Could not update store details");
  }
}
