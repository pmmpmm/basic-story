import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductService from "@/service/ProductService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import ProductCard from "@/components/ui/ProductCard";

const ProductsContent = () => {
  const { category } = useParams();
  // let title =
  //   category === "all"
  //     ? "전체"
  //     : category === "top"
  //       ? "상의"
  //       : category === "bottom"
  //         ? "하의"
  //         : category === "dress"
  //           ? "원피스"
  //           : category === "shoes"
  //             ? "신발"
  //             : category === "bag"
  //               ? "가방"
  //               : "";
  let title = "";
  switch (category) {
    case category === "all": // 변수 = 상수1이면, 실행문 A실행
      title = "전체";
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
      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
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
