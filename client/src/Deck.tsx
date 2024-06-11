import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
// import Deck from "./types/Deck";
import { Link, useParams } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { TDeck, getDecks } from "./api/getDecks";
import { deleteDeck } from "./api/deleteDeck";
import { createCard } from "./api/createCard";
import { getDeck } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";
import "./Deck.css";

const Deck = () => {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const { deckId } = useParams();

  //CORS error: Browser cannot access url that do not match same host name (ie client: 127.0.0.1 vs server:localhost:4000)
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault(); //form automatically refresh form and you lose data

    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  async function handleDelete(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  }

  // //concept of clean up function within useEffect
  // //cannot use async await in useEffect => create another async function outside or anonymous function
  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const fetchedDeck = await getDeck(deckId!);
      console.log(fetchedDeck);
      setDeck(fetchedDeck);
      setCards(fetchedDeck.cards);
    }

    fetchDeck();
  }, [deckId]);

  return (
    <div className="App">
      {/* making form accessible -> for people with diability : htmlFor for label, id for input*/}
      <h1 style={{color:"white"}}>{deck?.title}</h1>
      <div className="decks">
        <ul className="decks">
          {cards.map((card, index) => {
            return (
              <li key={card}>
                <button onClick={() => handleDelete(index)}>Delete</button>
                {card}
              </li>
            );
          })}
        </ul>
      </div>
      <form>
        <label style={{ color: "white" }} htmlFor="card-text">
          Card title
        </label>
        <input
          name="text"
          id="card-text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        ></input>
        <button onClick={handleCreateDeck}>Create Card</button>
      </form>
    </div>
  );
};

export default Deck;
