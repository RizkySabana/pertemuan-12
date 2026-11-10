
"use client";

import { useEffect } from "react";
import { Lottie } from "lottie-react";

export default function NotifikasiPeminjaman({
  notifikasi,
  onClose,
}) {
  useEffect(() => {
    if (!notifikasi) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [notifikasi, onClose]);

  if (!notifikasi) return null;

  const berhasil = notifikasi.tipe === "sukses";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div
        role="alert"
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center text-gray-800 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup notifikasi"
          className="absolute right-4 top-3 text-2xl text-gray-400 hover:text-gray-700"
        >
          ×
        </button>

        {berhasil ? (
          <div className="mx-auto mb-3 flex h-32 w-32 items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <span className="text-6xl font-bold text-green-600">
                ✓
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto h-36 w-36">
            <Lottie
              src="/animations/error.json"
              autoplay
              loop
            />
          </div>
        )}

        <h2
          className={`mb-2 text-xl font-bold ${
            berhasil ? "text-green-600" : "text-red-500"
          }`}
        >
          {notifikasi.judul}
        </h2>

        <p className="text-sm leading-relaxed text-gray-600">
          {notifikasi.pesan}
        </p>

        <button
          type="button"
          onClick={onClose}
          className={`mt-6 w-full rounded-lg px-5 py-3 font-semibold text-white ${
            berhasil
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Oke, Mengerti
        </button>
      </div>
    </div>
  );
}
