import { useState } from "react";
import Item from "./Item";

function Checklist({ items, onDeleteItem, onToggleItem, onClearItems }) {
  const [sortBy, setSortBy] = useState("input");

  function sortItems() {
    switch (sortBy) {
      case "title":
        return items.slice().sort((a, b) => a.title.localeCompare(b.title));
      case "status":
        return items.slice().sort((a, b) => Number(a.done) - Number(b.done));
      case "input":
      default:
        return items;
    }
  }

  const sortedItem = sortItems();

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">urutkan berdasarkan Input</option>
          <option value="title">urutkan berdasarkan Title</option>
          <option value="status">urutkan berdasarkan Status</option>
        </select>
        <button onClick={onClearItems}>Hapus</button>
      </div>
    </div>
  );
}

export default Checklist;
