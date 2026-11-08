
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useBukuStore } from "@/store/useBukuStore";
import { useTema } from "@/context/TemaContext";
import { usePinjamanStore } from "@/store/usePinjamanStore";

export default function Home() {
  const { tema, ubahTema } = useTema();
  const [kataKunci, setKataKunci] = useState("");

  // Mengambil data buku dari Zustand
  const daftarBuku = useBukuStore(
    (state) => state.daftarBuku
  );

  const ubahBuku = useBukuStore(
    (state) => state.ubahBuku
  );

  // Mengambil data pinjaman dari Zustand
  const daftarPinjaman = usePinjamanStore(
    (state) => state.daftarPinjaman
  );

  const tambahPinjaman = usePinjamanStore(
    (state) => state.tambahPinjaman
  );

  // Fitur pencarian buku
  const bukuTampil = daftarBuku.filter((buku) =>
    buku.judul.toLowerCase().includes(kataKunci.toLowerCase())
  );

  // Menghitung statistik buku
  const totalTersedia = daftarBuku.filter(
    (buku) => buku.status === "Tersedia"
  ).length;

  const totalDipinjam = daftarBuku.filter(
    (buku) => buku.status === "Dipinjam"
  ).length;

  // Fungsi peminjaman buku
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
      {/* Navbar */}
      <nav className="bg-[#0F5257] px-6 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-xl font-bold">
            Perpustakaan Kelas
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm">Beranda</span>

            <Link
              href="/pinjaman"
              className="text-sm hover:underline"
            >
              Pinjaman
            </Link>

            <Link
              href="/kelola-buku"
              className="text-sm hover:underline"
            >
              Kelola Buku
            </Link>

            <button
              onClick={ubahTema}
              className="rounded-lg border border-white px-4 py-2 text-sm hover:bg-white hover:text-[#0F5257]"
            >
              {tema === "terang" ? "Tema Gelap" : "Tema Terang"}
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Hero */}
        <section className="mb-10 rounded-2xl bg-[#0F5257] p-8 text-white">
          <p className="mb-2 text-sm text-[#E8DCC4]">
            SELAMAT DATANG
          </p>

          <h2 className="mb-3 text-3xl font-bold">
            Perpustakaan Kelas
          </h2>

          <p className="max-w-xl text-sm leading-7 text-[#E8DCC4]">
            Temukan berbagai buku menarik untuk menambah
            wawasan, pengetahuan, dan pengalaman belajar.
          </p>
        </section>

        {/* Statistik */}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            className={`rounded-xl p-5 shadow-sm ${
              tema === "gelap"
                ? "bg-gray-800 text-white"
                : "bg-white"
            }`}
          >
            <p
              className={`text-sm ${
                tema === "gelap"
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}
            >
              Total Koleksi Buku
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {daftarBuku.length}
            </h3>
          </div>

          <div
            className={`rounded-xl p-5 shadow-sm ${
              tema === "gelap"
                ? "bg-gray-800 text-white"
                : "bg-white"
            }`}
          >
            <p
              className={`text-sm ${
                tema === "gelap"
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}
            >
              Buku Tersedia
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {totalTersedia}
            </h3>
          </div>

          <div
            className={`rounded-xl p-5 shadow-sm ${
              tema === "gelap"
                ? "bg-gray-800 text-white"
                : "bg-white"
            }`}
          >
            <p
              className={`text-sm ${
                tema === "gelap"
                  ? "text-gray-300"
                  : "text-gray-500"
              }`}
            >
              Buku Dipinjam
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {totalDipinjam}
            </h3>
          </div>
        </section>

        {/* Katalog Buku */}
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

            {/* Pencarian */}
            <input
              type="text"
              placeholder="Cari judul buku..."
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              className="rounded-lg border border-[#0F5257] bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#0F5257]"
            />
          </div>

          {/* Daftar Buku */}
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
                  {/* Gambar Buku */}
                  <div className="relative mb-4 h-48 overflow-hidden rounded-lg bg-[#E8DCC4]">
                    <Image
                      src={buku.gambar}
                      alt={`Sampul buku ${buku.judul}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Informasi Buku */}
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

                  {/* Status dan Tombol */}
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

                    {/* Detail Buku */}
                    <Link
                      href={`/buku/${buku.id}`}
                      className="mt-4 block rounded-lg bg-[#0F5257] px-4 py-2 text-center text-sm text-white hover:bg-[#174449]"
                    >
                      Lihat Detail
                    </Link>

                    {/* Tombol Pinjaman */}
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

          {/* Jika Buku Tidak Ditemukan */}
          {bukuTampil.length === 0 && (
            <p className="py-10 text-center">
              Buku tidak ditemukan.
            </p>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-[#0F5257] px-6 py-6 text-center text-sm text-[#E8DCC4]">
        © 2026 Perpustakaan Kelas. Dibuat untuk kebutuhan pembelajaran.
      </footer>
    </main>
  );
}
