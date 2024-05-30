"use client"

import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader';
import ProductCard from './components/ProductCard';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const backendURL = "http://localhost:4000";

const categories = [
  'Fashion',
  'Books',
  'Toys',
  'Beauty',
  'Automotive',
];

interface Product {
  productId: string;
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availablity: string;
  image?: string;
}

const Products: React.FC<{ match: { params: { keyword: string } } }> = ({ match }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [price, setPrice] = useState<[number, number]>([0, 25000]);
  const [category, setCategory] = useState<string>('');
  const [ratings, setRatings] = useState<[number, number]>([0, 10]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const setCurrentPageNo = (e: number) => {
    setCurrentPage(e);
  };

  const priceHandler = (event: any, newPrice: number | number[]) => {
    setPrice(newPrice as [number, number]);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let link = `${backendURL}/api/v1/company/AMZ/categories/Toys/products?page=${currentPage}&priceUpper=${price[1]}&priceLower=${price[0]}&ratingsUpper=${ratings[0]}&ratingsLower=${ratings[1]}`;
      if (category) {
        link = `${backendURL}/api/v1/company/AMZ/categories/${category}/products?page=${currentPage}&priceLower=${price[1]}&priceUpper=${price[0]}&ratingsLower=${ratings[0]}&ratingsUpper=${ratings[1]}`;
      }

      const { data } = await axios.get<{ products: Product[] }>(link);
      setProducts(data.products);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, price, category, ratings]);

  return (
    <div className="flex justify-between">
      <div className="w-1/4 p-4">
        <div className="mb-4">
          <Typography>Price</Typography>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={25000}
          />
        </div>

        <div className="mb-4">
          <Typography>Categories</Typography>
          <ul>
            {categories.map(cat => (
              <li
                key={cat}
                onClick={() => setCategory(cat)}
                className="cursor-pointer"
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <fieldset className="mb-4">
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={ratings}
            onChange={(event: any, newRatings: number | number[]) => {
              setRatings(newRatings as [number, number]);
            }}
            aria-labelledby="range-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
        </fieldset>
      </div>

      <div className="w-3/4 p-4">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {products.map(product => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
