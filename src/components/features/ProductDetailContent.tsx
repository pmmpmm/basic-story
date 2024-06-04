import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdminUserService from "@/service/AdminUserService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import Button from "@/components/ui/Button";
import FormGroup from "@/components/ui/FormGroup";
import Radio from "@/components/ui/Radio";

const ProductDetailContent = () => {
  const { id } = useParams();
  const [option, setOption] = useState("");
  const { data } = useQuery({
    queryKey: ["produst", id],
    queryFn: AdminUserService.getProducts,
    enabled: !!id
  });

  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.id);
  };
  return (
    <>
      {data && (
        <ContentLayoutA>
          <div className="flex flex-row gap-10">
            <div className="basis-[54%]">
              <div className="w-full ">
                <img src={data.image} alt="상품 이미지" className="w-full" />
              </div>
            </div>

            <div className="basis-[46%]">
              <div className="mb-7">
                <h3 className="text-black text-3xl font-medium">{data.title}</h3>
                <p className="mt-1 text-lg font-light">₩ {data.price}</p>
                <p className="mt-4 text-base">{data.description}</p>
              </div>

              <hr className="border-gray-200" />

              <div className="flex flex-row items-center gap-4 mt-5">
                <p className="leading-none">사이즈</p>
                <FormGroup direction="row">
                  {data.options.map((item, idx) => (
                    <Radio
                      key={`option-${idx}`}
                      id={item}
                      value={item}
                      name="option"
                      onChange={handleSize}
                      checked={item === option ? true : false}
                    />
                  ))}
                </FormGroup>
              </div>

              <div className="mt-6">
                <Button text="장바구니 담기" href="/cart" variant="contain" size="full" />
              </div>
            </div>
          </div>
        </ContentLayoutA>
      )}
    </>
  );
};

export default ProductDetailContent;
