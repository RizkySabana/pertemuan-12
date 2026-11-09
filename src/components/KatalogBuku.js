
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function KatalogBuku({
  tema,
  daftarBuku,
  daftarPinjaman,
  pinjamBuku,
}) {
  const [kataKunci, setKataKunci] = useState("");

  const bukuTampil = daftarBuku.filter((buku) =>
    buku.judul.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <section>
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Katalog Buku
          </h2>

          <p
            className={`mt-1 text-sm ${
              tema === "gelap"
                ? "text-gray-300"
                : "text-[#527477]"
            }`}
          >
            Jelajahi koleksi buku perpustakaan kelas.
          </p>
        </div>

        <input
          type="text"
          placeholder="Cari judul buku..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          className="rounded-lg border border-[#0F5257] bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#0F5257]"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {bukuTampil.map((buku) => {
          const sudahDitambahkan = daftarPinjaman.some(
            (item) => item.id === buku.id
          );

          return (
            <div
              key={buku.id}
              className={`rounded-xl p-5 shadow-sm ${
                tema === "gelap"
                  ? "bg-gray-800 text-white"
                  : "bg-white"
              }`}
            >
              <div className="relative mb-4 h-48 overflow-hidden rounded-lg bg-[#E8DCC4]">
                <Image
                  src={buku.gambar}
                  alt={`Sampul buku ${buku.judul}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <p
                className={`mb-2 text-xs font-semibold ${
                  tema === "gelap"
                    ? "text-gray-300"
                    : "text-[#527477]"
                }`}
              >
                {buku.kategori}
              </p>

              <h3 className="text-lg font-bold">
                {buku.judul}
              </h3>

              <p
                className={`mt-1 text-sm ${
                  tema === "gelap"
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}
              >
                {buku.penulis}
              </p>

              <div
                className={`mt-4 border-t pt-3 ${
                  tema === "gelap"
                    ? "border-gray-600"
                    : "border-gray-200"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    buku.status === "Tersedia"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {buku.status}
                </span>

                <Link
                  href={`/buku/${buku.id}`}
                  className="mt-4 block rounded-lg bg-[#0F5257] px-4 py-2 text-center text-sm text-white hover:bg-[#174449]"
                >
                  Lihat Detail
                </Link>

                <button
                  onClick={() => pinjamBuku(buku)}
                  disabled={
                    sudahDitambahkan ||
                    buku.status === "Dipinjam"
                  }
                  className={`mt-2 w-full rounded-lg px-4 py-2 text-sm font-semibold ${
                    sudahDitambahkan ||
                    buku.status === "Dipinjam"
                      ? "cursor-not-allowed bg-gray-400 text-white"
                      : "bg-[#D6A84F] text-gray-900 hover:bg-[#C39536]"
                  }`}
                >
                  {sudahDitambahkan
                    ? "Sudah Ditambahkan"
                    : buku.status === "Dipinjam"
                      ? "Sedang Dipinjam"
                      : "Tambah ke Pinjaman"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {bukuTampil.length === 0 && (
        <p className="py-10 text-center">
          Buku tidak ditemukan.
        </p>
      )}
    </section>
  );
}
