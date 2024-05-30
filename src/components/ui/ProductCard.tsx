interface ProductProps {
  category: string;
  image: string;
  title: string;
  price: string;
}

const ProductCard = ({ category, image, title, price }: ProductProps) => {
  return (
    <div>
      <div>
        <img src={image} alt="상품 이미지" />
      </div>
      <div className="mt-2">
        <p className="font-semibold">{title}</p>
        <div className="flex flex-row justify-between text-xs font-light">
          <p>{category}</p>
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
