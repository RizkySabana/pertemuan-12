
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { daftarBuku } from "@/data/buku";

export const useBukuStore = create(
  persist(
    (set, get) => ({
      daftarBuku: daftarBuku.map((buku) => ({
        ...buku,
        stokTotal: buku.stokTotal ?? 5,
        stokTersedia: buku.stokTersedia ?? 5,
      })),

      // Menambahkan buku baru
      tambahBuku: (buku) => {
        const stokTotal = Math.max(
          0,
          Number(buku.stokTotal ?? 5)
        );

        set((state) => ({
          daftarBuku: [
            ...state.daftarBuku,
            {
              ...buku,
              id: Date.now(),
              stokTotal,
              stokTersedia: stokTotal,
              status: stokTotal > 0 ? "Tersedia" : "Dipinjam",
            },
          ],
        }));

        return true;
      },

      // Mengubah data buku dan jumlah stok
      ubahBuku: (id, dataBaru) => {
        const bukuLama = get().daftarBuku.find(
          (buku) => buku.id === id
        );

        if (!bukuLama) {
          return false;
        }

        const stokTotalBaru =
          dataBaru.stokTotal !== undefined
            ? Number(dataBaru.stokTotal)
            : bukuLama.stokTotal;

        if (
          !Number.isInteger(stokTotalBaru) ||
          stokTotalBaru < 0
        ) {
          return false;
        }

        const jumlahDipinjam =
          bukuLama.stokTotal - bukuLama.stokTersedia;

        // Stok total tidak boleh lebih sedikit
        // daripada jumlah buku yang sedang dipinjam
        if (stokTotalBaru < jumlahDipinjam) {
          return false;
        }

        const stokTersediaBaru =
          stokTotalBaru - jumlahDipinjam;

        set((state) => ({
          daftarBuku: state.daftarBuku.map((buku) =>
            buku.id === id
              ? {
                  ...buku,
                  ...dataBaru,
                  stokTotal: stokTotalBaru,
                  stokTersedia: stokTersediaBaru,
                  status:
                    stokTersediaBaru > 0
                      ? "Tersedia"
                      : "Dipinjam",
                }
              : buku
          ),
        }));

        return true;
      },

      // Menghapus buku
      hapusBuku: (id) =>
        set((state) => ({
          daftarBuku: state.daftarBuku.filter(
            (buku) => buku.id !== id
          ),
        })),

      // Mengurangi stok ketika buku dipinjam
      kurangiStok: (id) => {
        const buku = get().daftarBuku.find(
          (item) => item.id === id
        );

        if (!buku || buku.stokTersedia <= 0) {
          return false;
        }

        set((state) => ({
          daftarBuku: state.daftarBuku.map((item) =>
            item.id === id
              ? {
                  ...item,
                  stokTersedia: item.stokTersedia - 1,
                  status:
                    item.stokTersedia - 1 > 0
                      ? "Tersedia"
                      : "Dipinjam",
                }
              : item
          ),
        }));

        return true;
      },

      // Menambah stok ketika buku dikembalikan
      tambahStok: (id) =>
        set((state) => ({
          daftarBuku: state.daftarBuku.map((buku) => {
            if (buku.id !== id) {
              return buku;
            }

            const stokTersediaBaru = Math.min(
              buku.stokTersedia + 1,
              buku.stokTotal
            );

            return {
              ...buku,
              stokTersedia: stokTersediaBaru,
              status:
                stokTersediaBaru > 0
                  ? "Tersedia"
                  : "Dipinjam",
            };
          }),
        })),
    }),
    {
      name: "data-perpustakaan",
      version: 1,
    }
  )
);
