import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function deleteDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findByIdAndDelete(deckId);
  res.json({ message: "Successfully deleted the entry" });
}
