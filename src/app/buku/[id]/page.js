
import { daftarBuku } from "@/data/buku";
import DetailBuku from "./DetailBuku";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const buku = daftarBuku.find(
    (item) => item.id === Number(id)
  );

  if (!buku) {
    return {
      title: "Detail Buku",
      description: "Detail koleksi buku Perpustakaan Kelas.",
    };
  }

  return {
    title: buku.judul,
    description: buku.deskripsi,
    openGraph: {
      title: buku.judul,
      description: buku.deskripsi,
      images: [buku.gambar],
      type: "article",
    },
  };
}

export default async function DetailBukuPage({ params }) {
  const { id } = await params;

  return <DetailBuku id={id} />;
}
