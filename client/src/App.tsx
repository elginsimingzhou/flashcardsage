import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [decks, setDecks] = useState([]);
  const [title, setTitle] = useState<string>("");

  //CORS error: Browser cannot access url that do not match same host name (ie client: 127.0.0.1 vs server:localhost:4000)
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault(); //form automatically refresh form and you lose data
    await fetch("http://localhost:3000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle("");
  }

  //concept of clean up function within useEffect
  //cannot use async await in useEffect => create another async function outside or anonymous function
  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:3000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }

    fetchDecks();
  }, []);

  return (
    <div className="App">
      {/* making form accessible -> for people with diability : htmlFor for label, id for input*/}
      <div className="decks">
        <ul className="decks">
          {decks.map((deck) => {
            return <li key={deck._id}>{deck.title}</li>;
          })}
        </ul>
      </div>
      <form>
        <label htmlFor="deck-title">Deck title</label>
        <input
          name="title"
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        ></input>
        <button onClick={handleCreateDeck}>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
