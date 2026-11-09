
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function NotifikasiAkses() {
  const searchParams = useSearchParams();
  const aksesDitolak = searchParams.get("error") === "akses_ditolak";

  const [ditutup, setDitutup] = useState(false);

  useEffect(() => {
    setDitutup(false);
  }, [aksesDitolak]);

  if (!aksesDitolak || ditutup) {
    return null;
  }

  return (
    <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
      <div>
        <h3 className="font-bold">Akses Ditolak</h3>

        <p className="mt-1 text-sm">
          Maaf, Anda tidak memiliki izin untuk mengakses
          halaman Kelola Buku. Fitur ini hanya tersedia
          untuk Admin.
        </p>
      </div>

      <button
        onClick={() => setDitutup(true)}
        className="font-bold text-red-700 hover:text-red-900"
      >
        ×
      </button>
    </div>
  );
}
