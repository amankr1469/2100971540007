"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Loader from '../../components/Loader';
import { useParams } from 'next/navigation';

interface Product {
  name: string;
  company: string;
  category: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
  image: string;
}

interface PageProps {
    params: {
      slug: string
    }
  }

  const backendURL = "http://localhost:4000";

  const ProductDetailPage: React.FC<PageProps> = ({ params }) => {

  const { slug } = params;
  const router = useRouter();
  const productId  = slug;
  const category = slug;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get<Product>(`${backendURL}api/v1/company/AMZ/categories/${category}/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError('Product not found');
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, category]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return null;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Company: {product.company}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
      <img src={product.image} alt="img" />
    </div>
  );
};

export default ProductDetailPage;
