import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const products = require('./routes/product');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/v1', products)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});