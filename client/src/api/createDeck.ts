import { API_URL } from "./config";

//CORS error: Browser cannot access url that do not match same host name (ie client: 127.0.0.1 vs server:localhost:4000)
export async function createDeck(title:string) {
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
  
}
