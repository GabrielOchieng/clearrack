"use client";

import { useState } from "react";
import EditStoreModal from "./EditStoreModal"; // The component we just created

export default function StoreTable({ stores }: { stores: any[] }) {
  const [selectedStore, setSelectedStore] = useState<any | null>(null);

  return (
    <>
      <table className="w-full border-collapse border border-stone-200">
        <thead className="bg-stone-100">
          <tr>
            <th className="border p-2">Store Name</th>
            <th className="border p-2">Slug</th>
            <th className="border p-2">Logo URL</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {stores.map((store) => (
            <tr key={store.id}>
              <td className="border p-2">{store.name}</td>
              <td className="border p-2">{store.slug}</td>
              <td className="border p-2 text-stone-500 italic">
                {store.logoUrl || "MISSING"}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => setSelectedStore(store)}
                  className="text-blue-600 underline font-semibold"
                >
                  Edit Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* The separate Edit Component is triggered here */}
      {selectedStore && (
        <EditStoreModal
          store={selectedStore}
          onClose={() => setSelectedStore(null)}
        />
      )}
    </>
  );
}
