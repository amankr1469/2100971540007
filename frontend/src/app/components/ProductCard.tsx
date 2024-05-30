"use client"

import Link from "next/link";

interface Product {
  productId: string;
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availablity: string;
  image?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link href={`/product/${product.productId}`}>
      <span className="productCard">
        <img src={"https://picsum.photos/200"} alt={product.productName} />
        <p>{product.productName}</p>
        <span>{`₹${product.price}`}</span>
      </span>
    </Link>
  );
};

export default ProductCard;
