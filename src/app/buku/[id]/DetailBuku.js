
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useTema } from "@/context/TemaContext";
import { useBukuStore } from "@/store/useBukuStore";
import { usePinjamanStore } from "@/store/usePinjamanStore";

export default function DetailBuku({ id }) {
  const { tema } = useTema();

  const daftarBuku = useBukuStore(
    (state) => state.daftarBuku
  );

  const tambahPinjaman = usePinjamanStore(
    (state) => state.tambahPinjaman
  );

  const [siap, setSiap] = useState(false);
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    setSiap(true);
  }, []);

  const buku = daftarBuku.find(
    (item) => item.id === Number(id)
  );

  function pinjamBuku() {
    if (!buku || buku.stokTersedia <= 0) {
      setPesan("Maaf, stok buku sedang habis.");
      return;
    }

    const berhasil = tambahPinjaman(buku);

    if (berhasil) {
      setPesan("Buku berhasil dipinjam!");
    } else {
      setPesan("Maaf, stok buku sedang habis.");
    }
  }

  if (!siap) {
    return (
      <main className="min-h-screen p-10">
        Memuat detail buku...
      </main>
    );
  }

  if (!buku) {
    return (
      <main
        className={`min-h-screen p-10 ${
          tema === "gelap"
            ? "bg-gray-900 text-white"
            : "bg-[#E8DCC4] text-[#0F5257]"
        }`}
      >
        <h1 className="text-2xl font-bold">
          Buku Tidak Ditemukan
        </h1>

        <Link href="/" className="mt-4 inline-block hover:underline">
          Kembali ke Katalog
        </Link>
      </main>
    );
  }

  const stokTersedia = buku.stokTersedia ?? 5;
  const stokHabis = stokTersedia <= 0;

  return (
    <main
      className={`min-h-screen px-6 py-10 ${
        tema === "gelap"
          ? "bg-gray-900 text-white"
          : "bg-[#E8DCC4] text-[#0F5257]"
      }`}
    >
      <div
        className={`mx-auto max-w-4xl rounded-2xl p-8 shadow-sm ${
          tema === "gelap" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-semibold hover:underline"
        >
          ← Kembali ke Katalog
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative h-80 rounded-xl bg-[#E8DCC4]">
            <Image
              src={buku.gambar}
              alt={`Sampul buku ${buku.judul}`}
              fill
              unoptimized
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="mb-2 text-sm opacity-70">
              {buku.kategori}
            </p>

            <h1 className="mb-3 text-3xl font-bold">
              {buku.judul}
            </h1>

            <p className="mb-5 text-sm opacity-70">
              Penulis: {buku.penulis}
            </p>

            <p className="mb-5 leading-7">
              {buku.deskripsi}
            </p>

            <div className="mb-5 rounded-lg bg-[#E8DCC4] p-4 text-[#0F5257]">
              <p className="text-sm font-semibold">
                Stok Buku
              </p>

              <p className="mt-1 text-2xl font-bold">
                {stokTersedia} Eksemplar
              </p>

              <p className="mt-1 text-sm">
                {stokHabis
                  ? "Stok buku sedang habis."
                  : "Buku tersedia untuk dipinjam."}
              </p>
            </div>

            {pesan && (
              <p
                className={`mb-4 rounded-lg p-3 text-sm font-semibold ${
                  pesan.includes("berhasil")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {pesan}
              </p>
            )}

            <button
              onClick={pinjamBuku}
              disabled={stokHabis}
              className="w-full rounded-lg bg-[#0F5257] px-5 py-3 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {stokHabis ? "Stok Habis" : "Pinjam Buku"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
