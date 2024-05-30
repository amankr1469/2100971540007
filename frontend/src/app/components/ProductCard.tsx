import Link from "next/link";
import { Rating } from "@material-ui/lab";

interface Product {
  _id: string;
  name: string;
  ratings: number;
  numOfReviews: number;
  price: number;
  images: { url: string }[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link href={`/product/${product._id}`}>
      <a className="productCard">
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <Rating {...options} />
          <span className="productCardSpan">
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <span>{`₹${product.price}`}</span>
      </a>
    </Link>
  );
};

export default ProductCard;
