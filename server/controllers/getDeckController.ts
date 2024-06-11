import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function getDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findById(deckId); // Can modify find to include regex and authentication ie which deck belongs to which user
  res.json(deck);
}
