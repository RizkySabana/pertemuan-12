import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("perpustakaan_session")?.value;
  const urlTujuan = request.nextUrl.pathname;

  // 1. CEK AUTENTIKASI
  // Jika belum login, arahkan ke halaman login.
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // 2. CEK OTORISASI
  // Memeriksa role pengguna.
  try {
    const jsonString = Buffer.from(token, "base64").toString("utf-8");
    const dataUser = JSON.parse(jsonString);

    // Pengunjung tidak boleh masuk ke halaman Kelola Buku.
    if (
      urlTujuan.startsWith("/kelola-buku") &&
      dataUser.role !== "admin"
    ) {
      return NextResponse.redirect(
        new URL("/?error=akses_ditolak", request.url)
      );
    }
  } catch (error) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Jika pemeriksaan berhasil, lanjutkan ke halaman tujuan.
  return NextResponse.next();
}

export const config = {
  matcher: ["/kelola-buku/:path*"],
};