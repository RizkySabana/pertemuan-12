
"use client";

import { useTema } from "@/context/TemaContext";
import { useBukuStore } from "@/store/useBukuStore";
import { usePinjamanStore } from "@/store/usePinjamanStore";
import { Suspense } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatistikBuku from "@/components/StatistikBuku";
import KatalogBuku from "@/components/KatalogBuku";
import Footer from "@/components/Footer";
import NotifikasiAkses from "@/components/NotifikasiAkses";

export default function Home() {
  const { tema } = useTema();

  const daftarBuku = useBukuStore(
    (state) => state.daftarBuku
  );

  const ubahBuku = useBukuStore(
    (state) => state.ubahBuku
  );

  const daftarPinjaman = usePinjamanStore(
    (state) => state.daftarPinjaman
  );

  const tambahPinjaman = usePinjamanStore(
    (state) => state.tambahPinjaman
  );

  const totalTersedia = daftarBuku.filter(
    (buku) => buku.status === "Tersedia"
  ).length;

  const totalDipinjam = daftarBuku.filter(
    (buku) => buku.status === "Dipinjam"
  ).length;

  function pinjamBuku(buku) {
    const sudahDitambahkan = daftarPinjaman.some(
      (item) => item.id === buku.id
    );

    if (
      sudahDitambahkan ||
      buku.status === "Dipinjam"
    ) {
      return;
    }

    tambahPinjaman(buku);

    ubahBuku(buku.id, {
      status: "Dipinjam",
    });
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
          totalBuku={daftarBuku.length}
          totalTersedia={totalTersedia}
          totalDipinjam={totalDipinjam}
        />

        <KatalogBuku
          tema={tema}
          daftarBuku={daftarBuku}
          daftarPinjaman={daftarPinjaman}
          pinjamBuku={pinjamBuku}
        />
      </div>

      <Footer />
    </main>
  );
}
