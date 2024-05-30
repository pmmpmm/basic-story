import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductService from "@/service/ProductService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import ProductCard from "@/components/ui/ProductCard";

const ProductsContent = () => {
  const { category } = useParams();
  let title = "";
  switch (category) {
    case "all":
      title = "전체";
      break;
    case "top":
      title = "상의";
      break;
    case "bottom":
      title = "하의";
      break;
    case "dress":
      title = "원피스";
      break;
    case "shoes":
      title = "신발";
      break;
    case "bag":
      title = "가방";
      break;
  }

  const { data } = useQuery({
    queryKey: ["products", category],
    queryFn: ProductService.getProducts,
    select: (response) => {
      if (response) {
        return response.filter((item) => {
          if (category === "all") return item;
          return item.category === category;
        });
      }
    }
  });

  return (
    <ContentLayoutA>
      <ContentTitle title={title} />
      <div className="grid grid-cols-4 gap-x-4 gap-y-7">
        {data?.map((product, idx) => (
          <ProductCard
            key={`product-${idx}`}
            category={product.category}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </ContentLayoutA>
  );
};

export default ProductsContent;
