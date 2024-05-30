"use client"

import Link from "next/link";
// import { Rating } from "@material-ui/lab";

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
      <a className="productCard">
        <img src={"https://picsum.photos/200"} alt={product.productName} />
        <p>{product.productName}</p>
        {/* <div>
          <Rating {...options} />
        </div> */}
        <span>{`₹${product.price}`}</span>
      </a>
    </Link>
  );
};

export default ProductCard;
