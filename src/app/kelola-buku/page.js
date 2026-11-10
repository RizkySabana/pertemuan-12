
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const [gambar, setGambar] = useState(
    "/images/buku-atomic-habits.jpg"
  );
  const [stokTotal, setStokTotal] = useState("5");
  const [idEdit, setIdEdit] = useState(null);
  const [pesan, setPesan] = useState("");

  // State pencarian Open Library API
  const [kataKunci, setKataKunci] = useState("");
  const [hasilPencarian, setHasilPencarian] = useState([]);
  const [sedangMencari, setSedangMencari] = useState(false);
  const [errorCari, setErrorCari] = useState("");

  async function cariBuku(e) {
    e.preventDefault();

    if (!kataKunci.trim()) {
      setErrorCari("Masukkan judul atau nama penulis buku.");
      return;
    }

    setSedangMencari(true);
    setErrorCari("");
    setHasilPencarian([]);

    try {
      const response = await fetch(
        `/api/buku?q=${encodeURIComponent(kataKunci)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.pesan || "Gagal mencari buku.");
      }

      setHasilPencarian(data.buku || []);

      if (!data.buku || data.buku.length === 0) {
        setErrorCari("Buku tidak ditemukan.");
      }
    } catch (error) {
      setErrorCari(
        error.message || "Terjadi kesalahan saat mencari buku."
      );
    } finally {
      setSedangMencari(false);
    }
  }

  function pilihBuku(buku) {
    setJudul(buku.judul);
    setPenulis(buku.penulis);
    setKategori(buku.kategori);
    setDeskripsi(buku.deskripsi);
    setGambar(buku.gambar);
    setStokTotal("5");
    setIdEdit(null);
    setPesan("Data buku dari Open Library berhasil dipilih.");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetForm() {
    setJudul("");
    setPenulis("");
    setKategori("");
    setDeskripsi("");
    setGambar("/images/buku-atomic-habits.jpg");
    setStokTotal("5");
    setIdEdit(null);
  }

  function simpanBuku(e) {
    e.preventDefault();

    const jumlahStok = Number(stokTotal);

    if (
      !Number.isInteger(jumlahStok) ||
      jumlahStok < 0
    ) {
      setPesan("Jumlah stok harus berupa angka bulat minimal 0.");
      return;
    }

    const dataBuku = {
      judul,
      penulis,
      kategori,
      deskripsi,
      gambar,
      stokTotal: jumlahStok,
    };

    if (idEdit !== null) {
      const berhasil = ubahBuku(idEdit, dataBuku);

      if (!berhasil) {
        setPesan(
          "Stok total tidak boleh lebih sedikit daripada jumlah buku yang sedang dipinjam."
        );
        return;
      }

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
    setGambar(buku.gambar);
    setStokTotal(String(buku.stokTotal ?? 5));
    setPesan("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
          Cari, tambahkan, ubah, dan hapus koleksi buku perpustakaan.
        </p>

        {/* PENCARIAN OPEN LIBRARY API */}
        <section
          className={`mb-10 rounded-xl p-6 shadow-sm ${
            tema === "gelap" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="mb-2 text-xl font-bold">
            Cari Buku dari Open Library
          </h2>

          <p className="mb-5 text-sm opacity-70">
            Cari berdasarkan judul buku atau nama penulis.
          </p>

          <form onSubmit={cariBuku} className="flex flex-wrap gap-3">
            <input
              type="text"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              placeholder="Contoh: Atomic Habits"
              className={`min-w-0 flex-1 rounded-lg border p-3 ${warnaInput}`}
            />

            <button
              type="submit"
              disabled={sedangMencari}
              className="rounded-lg bg-[#0F5257] px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {sedangMencari ? "Mencari..." : "Cari Buku"}
            </button>
          </form>

          {errorCari && (
            <p className="mt-4 text-sm font-semibold text-red-500">
              {errorCari}
            </p>
          )}

          {hasilPencarian.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-4 font-bold">
                Hasil Pencarian ({hasilPencarian.length})
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {hasilPencarian.map((buku) => (
                  <div
                    key={buku.id}
                    className={`flex gap-4 rounded-xl border p-4 ${
                      tema === "gelap"
                        ? "border-gray-600 bg-gray-700"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                      <Image
                        src={buku.gambar}
                        alt={`Sampul ${buku.judul}`}
                        fill
                        unoptimized
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <h4 className="font-bold">
                        {buku.judul}
                      </h4>

                      <p className="mt-1 text-sm opacity-70">
                        {buku.penulis}
                      </p>

                      <p className="mt-1 text-xs opacity-70">
                        {buku.kategori}
                      </p>

                      <button
                        type="button"
                        onClick={() => pilihBuku(buku)}
                        className="mt-auto self-start rounded-lg bg-[#0F5257] px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
                      >
                        Pilih Buku
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* FORM TAMBAH DAN EDIT BUKU */}
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

            <div>
              <input
                required
                type="number"
                min="0"
                step="1"
                value={stokTotal}
                onChange={(e) => setStokTotal(e.target.value)}
                placeholder="Jumlah stok buku"
                className={`w-full rounded-lg border p-3 ${warnaInput}`}
              />
              <p className="mt-1 text-xs opacity-70">
                Masukkan jumlah seluruh eksemplar buku.
              </p>
            </div>

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

        {/* DAFTAR KOLEKSI BUKU */}
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
                  Stok Total: {buku.stokTotal ?? 5}
                </p>

                <p className="text-xs">
                  Stok Tersedia: {buku.stokTersedia ?? 5}
                </p>

                <p className="mt-1 text-xs">
                  Status: {buku.status}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => editBuku(buku)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
                >
                  Edit
                </button>

                <button
                  type="button"
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
