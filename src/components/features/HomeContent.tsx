import ProductService from "@/service/ProductService";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ui/ProductCard";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";

const HomeContent = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: ProductService.getProducts
  });
  return (
    <div>
      <div className="flex items-center justify-center w-full h-[440px] overflow-hidden">
        <img
          src="https://res.cloudinary.com/dd1uetgqc/image/upload/v1717126586/alyssa-strohmann-Af3GEg0DMEw-unsplash_vfi5xl.jpg"
          alt=""
          className="w-[111%] h-auto max-w-[inherit] mb-[30%] ml-[2%]"
        />
      </div>
      <div>
        <ContentLayoutA>
          <div className="grid grid-cols-3 gap-x-1.5 gap-y-7">
            {data?.map((product, idx) => (
              <ProductCard
                key={`product-${idx}`}
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        </ContentLayoutA>
      </div>
    </div>
  );
};

export default HomeContent;
