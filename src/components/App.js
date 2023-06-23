import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  // Declared here since state is set in child Form(), rendered in PackingList().
  // App() is the parent of these siblings.
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    // Cannot do items.push() as arrays are immutable in react
    // Rather create a new array with the current items plus append the new one
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />;
      <Form onAddItems={handleAddItems} />;
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      ;
      <Stats items={items} />;
    </div>
  );
}
