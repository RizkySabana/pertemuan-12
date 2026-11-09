"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("pengunjung");
  const [pesan, setPesan] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const akun = {
      admin: {
        username: "admin",
        password: "admin123",
        role: "admin",
      },
      pengunjung: {
        username: "pengunjung",
        password: "pengunjung123",
        role: "pengunjung",
      },
    };

    const akunDipilih = akun[role];

    if (
      username === akunDipilih.username &&
      password === akunDipilih.password
    ) {
      const dataUser = {
        username: akunDipilih.username,
        role: akunDipilih.role,
      };

      const token = btoa(JSON.stringify(dataUser));

      document.cookie = `perpustakaan_session=${token}; path=/; max-age=86400; SameSite=Lax`;

      router.push("/");
      router.refresh();
    } else {
      setPesan("Username atau password tidak sesuai.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#E8DCC4] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-[#0F5257]">
          Perpustakaan Kelas
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          Silakan login untuk melanjutkan.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Pilih Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border p-3 text-gray-800"
            >
              <option value="admin">Admin</option>
              <option value="pengunjung">Pengunjung</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border p-3 text-gray-800"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border p-3 text-gray-800"
              placeholder="Masukkan password"
              required
            />
          </div>

          {pesan && (
            <p className="text-sm text-red-600">{pesan}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#0F5257] p-3 font-semibold text-white hover:bg-[#174449]"
          >
            Login
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
          <p className="mb-2 font-bold">Akun Demo</p>
          <p>Admin: admin / admin123</p>
          <p>Pengunjung: pengunjung / pengunjung123</p>
        </div>
      </div>
    </main>
  );
}