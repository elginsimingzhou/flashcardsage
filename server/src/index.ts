require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import { getDeckController } from "../controllers/getDeckController";
import { getDecksController } from "../controllers/getDecksController";
import { createDeckController } from "../controllers/createDeckController";
import { deleteDeckController } from "../controllers/deleteDeckController";
import { createCardForDeckController } from "../controllers/createCardForDeckController";
import { deleteCardOnDeckController } from "../controllers/deleteCardOnDeckController";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json()) // Know to parse body and what to do with headers (ie enable user of req.body.title)

//Restful API - for a endpoint (ie /decks) , within path allow them to perform CRUD using api path

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.get("/decks/:deckId", getDeckController);
//standard: return deleted item back to user
app.delete("/decks/:deckId", deleteDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`);
  });
});

