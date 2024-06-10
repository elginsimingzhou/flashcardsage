require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "../models/Deck";

const PORT = 3000;

const app = express();

//Restful API - for a path (e /decks) , within path allow them to perform CRUD using api path

app.post("/decks", async (req: Request, res: Response) => {
  res.send("Helo world");
  const newDeck = new DeckModel({
    title: "My awesome flashcard deck"
  })

  const createdDeck = await newDeck.save();
  res.json(createdDeck);

  
});

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`);
  });
});

