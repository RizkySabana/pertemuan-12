
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePinjamanStore = create(
  persist(
    (set) => ({
      daftarPinjaman: [],

      tambahPinjaman: (buku) =>
        set((state) => ({
          daftarPinjaman: [
            ...state.daftarPinjaman,
            buku,
          ],
        })),

      hapusPinjaman: (id) =>
        set((state) => ({
          daftarPinjaman: state.daftarPinjaman.filter(
            (buku) => buku.id !== id
          ),
        })),
    }),
    {
      name: "daftar-pinjaman",
    }
  )
);
