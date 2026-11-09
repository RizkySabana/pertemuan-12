
export default function StatistikBuku({
  tema,
  totalBuku,
  totalTersedia,
  totalDipinjam,
}) {
  const warnaKartu =
    tema === "gelap"
      ? "bg-gray-800 text-white"
      : "bg-white";

  const warnaLabel =
    tema === "gelap"
      ? "text-gray-300"
      : "text-gray-500";

  return (
    <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className={`rounded-xl p-5 shadow-sm ${warnaKartu}`}>
        <p className={`text-sm ${warnaLabel}`}>
          Total Koleksi Buku
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {totalBuku}
        </h3>
      </div>

      <div className={`rounded-xl p-5 shadow-sm ${warnaKartu}`}>
        <p className={`text-sm ${warnaLabel}`}>
          Buku Tersedia
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {totalTersedia}
        </h3>
      </div>

      <div className={`rounded-xl p-5 shadow-sm ${warnaKartu}`}>
        <p className={`text-sm ${warnaLabel}`}>
          Buku Dipinjam
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {totalDipinjam}
        </h3>
      </div>
    </section>
  );
}
