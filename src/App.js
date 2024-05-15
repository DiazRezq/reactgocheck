import { useState } from "react";

function App() {
  const [listItems, setListItems] = useState([]);

  function handleAddItem(item) {
    setListItems((listItems) => [...listItems, item]);
  }

  function handleDeleteItem(id) {
    setListItems((listItems) => listItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setListItems((listItems) => {
      return listItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done,
          };
        }
        return item;
      });
    });
  }

  function handleClearItems() {
    const confirm = window.confirm("are you sure to clear list?");
    if (confirm) {
      setListItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <Checklist
        items={listItems}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={listItems} />
    </div>
  );
}

function Logo() {
  return <span className="logo">📑 GOCheck ✍</span>;
}

function Form({ onAddItem }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title) return;

    const newItem = {
      id: Date.now(),
      title,
      done: false,
    };

    onAddItem(newItem);

    setTitle("");
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What are you doing today ? 🧐</h3>
      <input
        type="text"
        name="title"
        id=""
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

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

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        value={item.done}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={{ textDecoration: item.done ? "line-through" : "" }}>
        {item.title}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

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

export default App;
