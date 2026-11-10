
"use client";

import Image from "next/image";
import Link from "next/link";

import { useTema } from "@/context/TemaContext";
import { usePinjamanStore } from "@/store/usePinjamanStore";

export default function HalamanPinjaman() {
  const { tema } = useTema();

  const daftarPinjaman = usePinjamanStore(
    (state) => state.daftarPinjaman
  );

  const hapusPinjaman = usePinjamanStore(
    (state) => state.hapusPinjaman
  );

  function kembalikanBuku(buku) {
    const berhasil = hapusPinjaman(
      buku.idPinjaman ?? buku.id
    );

    if (berhasil) {
      alert("Buku berhasil dikembalikan. Stok telah diperbarui.");
    }
  }

  return (
    <main
      className={`min-h-screen px-6 py-10 ${
        tema === "gelap"
          ? "bg-gray-900 text-white"
          : "bg-[#E8DCC4] text-[#0F5257]"
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="font-semibold hover:underline">
          ← Kembali ke Katalog
        </Link>

        <div className="mb-8 mt-6">
          <h1 className="text-3xl font-bold">
            Daftar Pinjaman
          </h1>

          <p className="mt-2 opacity-70">
            Buku yang sedang kamu pinjam.
          </p>
        </div>

        <div
          className={`mb-6 rounded-xl p-5 shadow-sm ${
            tema === "gelap" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <p className="text-sm">Total Buku Dipinjam</p>

          <h2 className="mt-2 text-3xl font-bold">
            {daftarPinjaman.length}
          </h2>
        </div>

        {daftarPinjaman.length === 0 ? (
          <div
            className={`rounded-xl p-10 text-center shadow-sm ${
              tema === "gelap" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <p className="text-lg font-semibold">
              Belum Ada Buku Pinjaman
            </p>

            <p className="mt-2 text-sm opacity-70">
              Silakan pilih buku dari katalog terlebih dahulu.
            </p>

            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-[#0F5257] px-5 py-3 text-sm text-white"
            >
              Lihat Katalog
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {daftarPinjaman.map((buku, index) => (
              <div
                key={buku.idPinjaman ?? `${buku.id}-${index}`}
                className={`flex gap-4 rounded-xl p-5 shadow-sm ${
                  tema === "gelap" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="relative h-36 w-28 shrink-0 rounded-lg bg-[#E8DCC4]">
                  <Image
                    src={buku.gambar}
                    alt={`Sampul buku ${buku.judul}`}
                    fill
                    unoptimized
                    className="object-contain p-2"
                    sizes="112px"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <p className="text-xs opacity-60">
                    {buku.kategori}
                  </p>

                  <h2 className="mt-1 font-bold">
                    {buku.judul}
                  </h2>

                  <p className="mt-1 text-sm opacity-60">
                    {buku.penulis}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-orange-500">
                    Status: Dipinjam
                  </p>

                  <button
                    onClick={() => kembalikanBuku(buku)}
                    className="mt-3 rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                  >
                    Kembalikan Buku
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
