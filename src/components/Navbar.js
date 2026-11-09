
"use client";

import Link from "next/link";
import { useTema } from "@/context/TemaContext";

export default function Navbar() {
  const { tema, ubahTema } = useTema();

  return (
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
  );
}
