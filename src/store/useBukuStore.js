
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { daftarBuku } from "@/data/buku";

export const useBukuStore = create(
  persist(
    (set) => ({
      daftarBuku: daftarBuku,

      tambahBuku: (buku) =>
        set((state) => ({
          daftarBuku: [
            ...state.daftarBuku,
            {
              ...buku,
              id: Date.now(),
            },
          ],
        })),

      ubahBuku: (id, dataBaru) =>
        set((state) => ({
          daftarBuku: state.daftarBuku.map((buku) =>
            buku.id === id
              ? { ...buku, ...dataBaru }
              : buku
          ),
        })),

      hapusBuku: (id) =>
        set((state) => ({
          daftarBuku: state.daftarBuku.filter(
            (buku) => buku.id !== id
          ),
        })),
    }),
    {
      name: "data-perpustakaan",
    }
  )
);
