import { useState } from 'react';

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

// const questions = [
//   {
//     "id": 1,
//     "question": "What is React?",
//     "answer": "A JavaScript library for building user interfaces."
//   },
//   {
//     "id": 2,
//     "question": "What is JSX?",
//     "answer": "A syntax extension that lets you write HTML in JavaScript."
//   },
//   {
//     "id": 3,
//     "question": "What are React hooks?",
//     "answer": "Functions that let you use state and lifecycle features in functional components."
//   },
//   {
//     "id": 4,
//     "question": "What is useState?",
//     "answer": "A React hook for managing state in functional components."
//   },
//   {
//     "id": 5,
//     "question": "What is a component?",
//     "answer": "A reusable piece of UI in a React application."
//   },
//   {
//     "id": 6,
//     "question": "What is the Virtual DOM?",
//     "answer": "A lightweight copy of the real DOM used for efficient updates."
//   }
// ]

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
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
      'Are you sure you want to delete all items?'
    );
    if (confirmed) setItems([]);
  }

  return (
    <>
      {/* <Flashcard /> */}
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        onClearItems={handleClearList}
        onToggleItems={handleToggleItem}
        onDeleteItem={handleDeleteItem}
        items={items}
      />
      <Stats items={items} />
    </>
  );
}

// function Flashcard() {

//   const [isVisible, setIsVisible] = useState(false);

//   function handleClick() {
//     setIsVisible(!isVisible);
//   }

//   return <div className="flashcard" onClick={handleClick}>
//     {questions.map((q) => {
//       isVisible ? <p className="ques">{q.question}</p> : <p className="ans">{q.answer}</p>
//     })}
//     <p className="ques">{questions.question}</p>
//   </div>;
// }

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setQuantity(1);
    setDescription('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItems, onClearItems }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description') {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const numPercentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {numPercentage === 100
          ? "You've got everything! Let's go ✈️"
          : `👜You have ${numItems} items on your list, and you already packed ${numPacked} (${numPercentage})%.`}
      </em>
    </footer>
  );
}
