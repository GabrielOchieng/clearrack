"use client";

import { updateStoreDetails } from "@/app/actions/admin-actions";

export default function EditStoreModal({
  store,
  onClose,
}: {
  store: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl w-full max-w-lg text-white">
        <h2 className="text-lg font-black mb-4">Edit Store: {store.name}</h2>

        <form
          action={async (formData) => {
            // Resolve the color: use text input if typed, otherwise fallback to picker
            const colorPicker = formData.get("bannerColorPicker") as string;
            const colorText = formData.get("bannerColorText") as string;

            await updateStoreDetails(store.id, {
              name: formData.get("name") as string,
              slug: formData.get("slug") as string,
              domain: (formData.get("domain") as string) || null,
              logoUrl: (formData.get("logoUrl") as string) || null,
              bannerColor: colorText || colorPicker,
            });
            onClose();
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-[10px] uppercase font-bold text-stone-400">
              Store Name
            </label>
            <input
              name="name"
              defaultValue={store.name}
              className="w-full bg-stone-800 p-2 rounded mt-1 border border-stone-700"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-stone-400">
              Slug (Subdomain)
            </label>
            <input
              name="slug"
              defaultValue={store.slug}
              className="w-full bg-stone-800 p-2 rounded mt-1 border border-stone-700"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-stone-400">
              Custom Domain
            </label>
            <input
              name="domain"
              defaultValue={store.domain || ""}
              placeholder="e.g., myshop.com"
              className="w-full bg-stone-800 p-2 rounded mt-1 border border-stone-700"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-stone-400">
              Logo URL
            </label>
            <input
              name="logoUrl"
              defaultValue={store.logoUrl || ""}
              className="w-full bg-stone-800 p-2 rounded mt-1 border border-stone-700"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-stone-400">
              Banner Color
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="color"
                name="bannerColorPicker"
                defaultValue={store.bannerColor}
                className="h-10 w-10 bg-transparent cursor-pointer"
              />
              <input
                name="bannerColorText"
                defaultValue={store.bannerColor}
                className="flex-1 bg-stone-800 p-2 rounded border border-stone-700"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-orange-600 font-bold py-2 rounded-lg hover:bg-orange-500 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-stone-800 font-bold py-2 rounded-lg hover:bg-stone-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
