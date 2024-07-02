import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 4, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((item) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleDeleteList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all itmes?"
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItem}
        onDeleteList={handleDeleteList}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescripton] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    setDescripton("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          // console.log(e.target.value);
          setQuantity(e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="...item"
        value={description}
        onChange={(e) => {
          // console.log(e.target.value);
          setDescripton(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
function Item({ item, onDeleteItems, onToggleItems, onDeleteList }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />{" "}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        {item.description} {item.quantity}
      </span>
      <button
        onClick={() => {
          onDeleteItems(item.id);
        }}
      >
        ❌&itmes;
      </button>
    </li>
  );
}
function PackingList({ items, onDeleteItems, onToggleItems, onDeleteList }) {
  const [sortBy, setSortBy] = useState("input");
  // const [list, setList] = useState([]);

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed - Number(b.packed)));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by the input order</option>
          <option value="description">Sort by the description</option>
          <option value="packed">Sort by the packed status</option>
        </select>
        <button onClick={onDeleteList}>Clear List</button>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>you have X items on your list, and you already packed X</em>
    </footer>
  );
}
