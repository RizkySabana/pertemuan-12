
"use client";

import { useState } from "react";
import Link from "next/link";

import { useTema } from "@/context/TemaContext";
import { useBukuStore } from "@/store/useBukuStore";

export default function KelolaBuku() {
  const { tema } = useTema();

  const daftarBuku = useBukuStore(
    (state) => state.daftarBuku
  );

  const tambahBuku = useBukuStore(
    (state) => state.tambahBuku
  );

  const ubahBuku = useBukuStore(
    (state) => state.ubahBuku
  );

  const hapusBuku = useBukuStore(
    (state) => state.hapusBuku
  );

  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [kategori, setKategori] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState("Tersedia");
  const [idEdit, setIdEdit] = useState(null);
  const [pesan, setPesan] = useState("");

  function resetForm() {
    setJudul("");
    setPenulis("");
    setKategori("");
    setDeskripsi("");
    setStatus("Tersedia");
    setIdEdit(null);
  }

  function simpanBuku(e) {
    e.preventDefault();

    const dataBuku = {
      judul,
      penulis,
      kategori,
      deskripsi,
      status,
      gambar: "/images/buku-atomic-habits.jpg",
    };

    if (idEdit !== null) {
      ubahBuku(idEdit, dataBuku);
      setPesan("Data buku berhasil diperbarui.");
    } else {
      tambahBuku(dataBuku);
      setPesan("Buku baru berhasil ditambahkan.");
    }

    resetForm();
  }

  function editBuku(buku) {
    setIdEdit(buku.id);
    setJudul(buku.judul);
    setPenulis(buku.penulis);
    setKategori(buku.kategori);
    setDeskripsi(buku.deskripsi);
    setStatus(buku.status);
    setPesan("");
  }

  function hapusDataBuku(id) {
    if (confirm("Apakah kamu yakin ingin menghapus buku ini?")) {
      hapusBuku(id);
      setPesan("Data buku berhasil dihapus.");

      if (idEdit === id) {
        resetForm();
      }
    }
  }

  const warnaInput =
    tema === "gelap"
      ? "border-gray-600 bg-gray-700 text-white"
      : "border-gray-300 bg-white text-gray-800";

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

        <h1 className="mb-2 mt-6 text-3xl font-bold">
          Kelola Buku
        </h1>

        <p className="mb-8 text-sm">
          Tambahkan, ubah, dan hapus koleksi buku perpustakaan.
        </p>

        <form
          onSubmit={simpanBuku}
          className={`mb-10 rounded-xl p-6 shadow-sm ${
            tema === "gelap" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="mb-5 text-xl font-bold">
            {idEdit !== null ? "Edit Data Buku" : "Tambah Buku Baru"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Judul buku"
              className={`rounded-lg border p-3 ${warnaInput}`}
            />

            <input
              required
              value={penulis}
              onChange={(e) => setPenulis(e.target.value)}
              placeholder="Nama penulis"
              className={`rounded-lg border p-3 ${warnaInput}`}
            />

            <input
              required
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              placeholder="Kategori buku"
              className={`rounded-lg border p-3 ${warnaInput}`}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`rounded-lg border p-3 ${warnaInput}`}
            >
              <option value="Tersedia">Tersedia</option>
              <option value="Dipinjam">Dipinjam</option>
            </select>

            <textarea
              required
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Deskripsi buku"
              rows={3}
              className={`rounded-lg border p-3 md:col-span-2 ${warnaInput}`}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-[#0F5257] px-5 py-3 text-white hover:opacity-90"
            >
              {idEdit !== null ? "Simpan Perubahan" : "Tambah Buku"}
            </button>

            {idEdit !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg bg-gray-500 px-5 py-3 text-white"
              >
                Batal Edit
              </button>
            )}
          </div>

          {pesan && (
            <p className="mt-4 text-sm font-semibold">
              {pesan}
            </p>
          )}
        </form>

        <h2 className="mb-4 text-xl font-bold">
          Daftar Koleksi Buku ({daftarBuku.length})
        </h2>

        <div className="space-y-3">
          {daftarBuku.map((buku) => (
            <div
              key={buku.id}
              className={`flex flex-wrap items-center justify-between gap-4 rounded-xl p-5 shadow-sm ${
                tema === "gelap" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div>
                <h3 className="font-bold">{buku.judul}</h3>
                <p className="text-sm opacity-70">
                  {buku.penulis} • {buku.kategori}
                </p>
                <p className="mt-1 text-xs">
                  Status: {buku.status}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editBuku(buku)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => hapusDataBuku(buku.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
