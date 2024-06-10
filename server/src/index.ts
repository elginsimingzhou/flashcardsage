require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import DeckModel from "../models/Deck";
import cors from 'cors';

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json()) // Know to parse body and what to do with headers (ie enable user of req.body.title)

//Restful API - for a endpoint (ie /decks) , within path allow them to perform CRUD using api path

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await DeckModel.find(); // Can modify find to include regex and authentication ie which deck belongs to which user
  // console.log(decks)
  res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new DeckModel({
    title: req.body.title ,
  })

  const createdDeck = await newDeck.save();
  res.json(createdDeck);

  
});

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`);
  });
});

