import { useParams } from "react-router-dom";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";

const ProductsContent = () => {
  const { category } = useParams();
  let title =
    category === "all"
      ? "전체"
      : category === "top"
      ? "상의"
      : category === "bottom"
      ? "하의"
      : category === "dress"
      ? "원피스"
      : category === "shoes"
      ? "신발"
      : category === "bag"
      ? "가방"
      : "";
  return (
    <ContentLayoutA>
      <ContentTitle title={title} />
    </ContentLayoutA>
  );
};

export default ProductsContent;
