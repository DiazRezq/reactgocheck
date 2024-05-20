function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <span>Buat Aktivitas kamu sekarang ✏</span>
      </footer>
    );
  }

  const totalItem = items.length;
  const doneItem = items.filter((item) => item.done).length;
  const precentage = Math.round((doneItem / totalItem) * 100);
  return (
    <footer className="stats">
      <span>
        {precentage === 100
          ? "kegiatan kamu selesai"
          : `kamu punya ${totalItem} catatan dan baru ${doneItem} yang selesai (${precentage}%)`}
      </span>
    </footer>
  );
}

export default Stats;
