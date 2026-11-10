
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useBukuStore } from "@/store/useBukuStore";

export const usePinjamanStore = create(
  persist(
    (set, get) => ({
      daftarPinjaman: [],

      // Meminjam buku
      tambahPinjaman: (buku) => {
        const daftarPinjaman = get().daftarPinjaman;

        // Memeriksa apakah judul sudah dipinjam
        const sudahDipinjam = daftarPinjaman.some(
          (pinjaman) =>
            pinjaman.judul.trim().toLowerCase() ===
            buku.judul.trim().toLowerCase()
        );

        if (sudahDipinjam) {
          return "SUDAH_DIPINJAM";
        }

        // Mengurangi stok buku
        const berhasil = useBukuStore
          .getState()
          .kurangiStok(buku.id);

        if (!berhasil) {
          return "STOK_HABIS";
        }

        set((state) => ({
          daftarPinjaman: [
            ...state.daftarPinjaman,
            {
              ...buku,
              idPinjaman: Date.now(),
            },
          ],
        }));

        return "BERHASIL";
      },

      // Mengembalikan buku
      hapusPinjaman: (id) => {
        const daftarPinjaman = get().daftarPinjaman;

        const index = daftarPinjaman.findIndex(
          (buku) =>
            buku.idPinjaman === id || buku.id === id
        );

        if (index === -1) {
          return false;
        }

        const bukuDikembalikan = daftarPinjaman[index];

        // Mengembalikan stok buku
        useBukuStore
          .getState()
          .tambahStok(bukuDikembalikan.id);

        // Menghapus data peminjaman
        set((state) => ({
          daftarPinjaman: state.daftarPinjaman.filter(
            (_, i) => i !== index
          ),
        }));

        return true;
      },
    }),
    {
      name: "daftar-pinjaman",
    }
  )
);
