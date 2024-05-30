import express from 'express';
import { getAllProducts } from "../controller/products";


const router = express.Router();

//Route for all products
router.route("/products").get(getAllProducts);