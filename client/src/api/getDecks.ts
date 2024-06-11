import { API_URL } from "./config";

export type TDeck = {
    _id:string,
    title:string,
    cards: string[],
}

export async function getDecks(): Promise<TDeck[]> {
    const response = await fetch(`${API_URL}/decks`);
    return response.json();
}