
"use client";

import { useCallback, useState, Suspense } from "react";

import { useTema } from "@/context/TemaContext";
import { useBukuStore } from "@/store/useBukuStore";
import { usePinjamanStore } from "@/store/usePinjamanStore";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatistikBuku from "@/components/StatistikBuku";
import KatalogBuku from "@/components/KatalogBuku";
import Footer from "@/components/Footer";
import NotifikasiAkses from "@/components/NotifikasiAkses";
import NotifikasiPeminjaman from "@/components/NotifikasiPeminjaman";

export default function Home() {
  const { tema } = useTema();

  const [notifikasi, setNotifikasi] = useState(null);

  const tutupNotifikasi = useCallback(() => {
    setNotifikasi(null);
  }, []);

  const daftarBuku = useBukuStore(
    (state) => state.daftarBuku
  );

  const tambahPinjaman = usePinjamanStore(
    (state) => state.tambahPinjaman
  );

  // Menghitung jumlah seluruh stok buku
  const totalBuku = daftarBuku.reduce(
    (total, buku) => total + (buku.stokTotal ?? 5),
    0
  );

  // Menghitung jumlah stok yang masih tersedia
  const totalTersedia = daftarBuku.reduce(
    (total, buku) => total + (buku.stokTersedia ?? 5),
    0
  );

  // Menghitung jumlah buku yang sedang dipinjam
  const totalDipinjam = totalBuku - totalTersedia;

  // Fungsi peminjaman buku
  function pinjamBuku(buku) {
    const hasil = tambahPinjaman(buku);

    if (hasil === "BERHASIL") {
      setNotifikasi({
        tipe: "sukses",
        judul: "Peminjaman Berhasil!",
        pesan: "Buku berhasil ditambahkan ke daftar pinjamanmu.",
      });
    } else if (hasil === "SUDAH_DIPINJAM") {
      setNotifikasi({
        tipe: "error",
        judul: "Buku Sudah Dipinjam",
        pesan:
          "Kamu sudah meminjam buku dengan judul ini. Silakan kembalikan terlebih dahulu sebelum meminjamnya lagi.",
      });
    } else {
      setNotifikasi({
        tipe: "error",
        judul: "Stok Buku Habis",
        pesan:
          "Maaf, stok buku ini sedang habis. Silakan coba lagi setelah tersedia.",
      });
    }
  }

  return (
    <main
      className={`min-h-screen ${
        tema === "gelap"
          ? "bg-gray-900 text-white"
          : "bg-[#E8DCC4] text-[#0F5257]"
      }`}
    >
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Suspense fallback={null}>
          <NotifikasiAkses />
        </Suspense>

        <Hero />

        <StatistikBuku
          tema={tema}
          totalBuku={totalBuku}
          totalTersedia={totalTersedia}
          totalDipinjam={totalDipinjam}
        />

        <KatalogBuku
          tema={tema}
          daftarBuku={daftarBuku}
          pinjamBuku={pinjamBuku}
        />
      </div>

      <Footer />

      {/* Notifikasi peminjaman */}
      <NotifikasiPeminjaman
        notifikasi={notifikasi}
        onClose={tutupNotifikasi}
      />
    </main>
  );
}
