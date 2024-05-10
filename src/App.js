import { useState } from "react";

function App() {
  const [listItems, setListItems] = useState([]);

  function handleAddItem(item) {
    setListItems((listItems) => [...listItems, item]);
  }

  function handleDeleteItem(id) {
    setListItems((listItems) => listItems.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <Checklist items={listItems} onDeleteItem={handleDeleteItem} />
      <Stats />
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

function Checklist({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li key={item.id}>
      <input type="checkbox" />
      <span style={{ textDecoration: item.done ? "line-through" : "" }}>
        {item.title}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <span>kamu punya x catatan dan baru x yang dicheck (x)</span>
    </footer>
  );
}

export default App;
