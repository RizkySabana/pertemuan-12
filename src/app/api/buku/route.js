
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const kataKunci = searchParams.get("q");

    if (!kataKunci || !kataKunci.trim()) {
      return NextResponse.json(
        { pesan: "Kata kunci pencarian harus diisi." },
        { status: 400 }
      );
    }

    const url = new URL("https://openlibrary.org/search.json");

    url.searchParams.set("q", kataKunci.trim());
    url.searchParams.set(
      "fields",
      "key,title,author_name,first_publish_year,cover_i,subject"
    );
    url.searchParams.set("limit", "10");

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          pesan: "Layanan Open Library sedang mengalami gangguan. Silakan coba lagi.",
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    const daftarBuku = (data.docs || []).map((item) => ({
      id: item.key,
      judul: item.title || "Judul tidak tersedia",
      penulis:
        item.author_name?.join(", ") ||
        "Penulis tidak diketahui",
      kategori: item.subject?.[0] || "Umum",
      deskripsi: item.first_publish_year
        ? `Pertama kali diterbitkan pada tahun ${item.first_publish_year}.`
        : "Informasi deskripsi tidak tersedia.",
      gambar: item.cover_i
        ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
        : "/images/buku-atomic-habits.jpg",
    }));

    return NextResponse.json({
      total: data.numFound || 0,
      buku: daftarBuku,
    });
  } catch (error) {
    console.error("Kesalahan Open Library API:", error);

    const timeout = error.name === "TimeoutError";

    return NextResponse.json(
      {
        pesan: timeout
          ? "Pencarian membutuhkan waktu terlalu lama. Silakan coba lagi."
          : "Open Library tidak dapat dihubungi. Periksa koneksi internet dan coba lagi.",
      },
      { status: timeout ? 504 : 503 }
    );
  }
}
