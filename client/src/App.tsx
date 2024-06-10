import { useEffect, useState } from "react";
import "./App.css";
// import Deck from "./types/Deck";
import { Link } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { TDeck, getDecks } from "./api/getDecks";
import { deleteDeck } from "./api/deleteDeck";

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState<string>("");

  //CORS error: Browser cannot access url that do not match same host name (ie client: 127.0.0.1 vs server:localhost:4000)
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault(); //form automatically refresh form and you lose data
   
    const deck = await createDeck(title) ;
    setDecks([...decks,deck]);
    setTitle("");
    
  }

  async function handleDelete(deckId: string) {
    await deleteDeck(deckId)
    //optimistiic update approach
    setDecks(decks.filter((deck) => {return deck._id !== deckId}))
  }

  //concept of clean up function within useEffect
  //cannot use async await in useEffect => create another async function outside or anonymous function
  useEffect(() => {
    async function fetchDecks(){
      const decks = await getDecks() ;
      setDecks(decks);
    }
    
    fetchDecks();

  }, []);

  return (
    <div className="App">
      {/* making form accessible -> for people with diability : htmlFor for label, id for input*/}
      <div className="decks">
        <ul className="decks">
          {decks.map((deck) => {
            return (
              <li key={deck._id}>
                <button onClick={()=> handleDelete(deck._id)}>Delete</button>
                <Link to={`decks/${deck._id}`}>{deck.title}</Link>
              </li>
            );
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
