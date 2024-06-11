import { API_URL } from "./config";
import { TDeck } from "./getDecks";

//CORS error: Browser cannot access url that do not match same host name (ie client: 127.0.0.1 vs server:localhost:4000)
export async function createCard(deckId:string, text:string): Promise<TDeck> {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
  
}