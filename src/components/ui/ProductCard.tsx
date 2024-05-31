interface ProductProps {
  id: string;
  image: string;
  title: string;
  price: string;
}

const ProductCard = ({ id, image, title, price }: ProductProps) => {
  return (
    <div>
      <div>
        <img src={image} alt="상품 이미지" />
      </div>
      <div className="mt-2">
        <p className="font-medium text-black">{title}</p>
        <div className="flex flex-row justify-between mt-[2px] text-xs font-light">
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
