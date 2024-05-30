"use client"

import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader';
import ProductCard from './components/ProductCard';
// import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const backendURL = "http://localhost:4000";

const categories = [
  'T-shirts',
  'Jeans',
  'Shirts',
  'Jackets',
  'Hoodies',
  'Shoes',
  'Cardigans',
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
  const [ratings, setRatings] = useState<number>(0);
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
      let link = `${backendURL}/api/v1/products?&&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `${backendURL}/api/v1/products?&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get<{ products: Product[] }>(link);
      setProducts(data.products);
      setLoading(false);
    } catch (error: any) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => <ProductCard key={product.productId} product={product} />)}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating as number);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {/* {false && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={5} 
                totalItemsCount={10} 
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )} */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
