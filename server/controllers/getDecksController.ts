import { Request, Response } from "express";
import DeckModel from "../models/Deck";

export async function getDecksController(req: Request, res: Response){
  const decks = await DeckModel.find(); // Can modify find to include regex and authentication ie which deck belongs to which user
  // console.log(decks)
  res.json(decks);
}