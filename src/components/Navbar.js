
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTema } from "@/context/TemaContext";

export default function Navbar() {
  const { tema, ubahTema } = useTema();
  const router = useRouter();

  const [user, setUser] = useState(null);

  // Membaca data pengguna dari cookie
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("perpustakaan_session="));

    if (cookie) {
      try {
        const token = cookie.split("=")[1];
        const dataUser = JSON.parse(atob(token));
        setUser(dataUser);
      } catch (error) {
        setUser(null);
      }
    }
  }, []);

  function handleLogout() {
    document.cookie =
      "perpustakaan_session=; path=/; max-age=0; SameSite=Lax";

    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="bg-[#0F5257] px-6 py-5 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold">
          Perpustakaan Kelas
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/" className="text-sm hover:underline">
            Beranda
          </Link>

          <Link
            href="/pinjaman"
            className="text-sm hover:underline"
          >
            Pinjaman
          </Link>

          {/* Menu hanya ditampilkan untuk Admin */}
          {user?.role === "admin" && (
            <Link
              href="/kelola-buku"
              className="text-sm hover:underline"
            >
              Kelola Buku
            </Link>
          )}

          <button
            onClick={ubahTema}
            className="rounded-lg border border-white px-4 py-2 text-sm hover:bg-white hover:text-[#0F5257]"
          >
            {tema === "terang" ? "Tema Gelap" : "Tema Terang"}
          </button>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
