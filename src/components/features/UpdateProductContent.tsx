import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductDomain } from "@/domain/ProductDomain";
import AdminUserService from "@/service/AdminUserService";
import ContentLayoutA from "@/components/layouts/ContentLayoutA";
import ContentBottomLayoutA from "@/components/layouts/ContentBottomLayoutA";
import ContentTitle from "@/components/ui/ContentTitle";
import TextField from "@/components/ui/TextField";
import FormGroup from "@/components/ui/FormGroup";
import Radio from "@/components/ui/Radio";
import CheckBox from "@/components/ui/CheckBox";
import Button from "@/components/ui/Button";
import { useQuery } from "@tanstack/react-query";

const UpdateProductContent = () => {
  ///products/update?id=07d90d98-42df-48be-926e-3010108fcc91
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id") as string;

  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: AdminUserService.getProducts,
    enabled: !!id
  });

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);
  // 상품 정보 세팅
  const [product, setProduct] = useState<ProductDomain>({
    category: "top",
    image: "",
    id: id,
    title: "",
    options: [],
    price: "",
    description: ""
  });
  const { category, title, options, price, description } = product;

  // 카테고리
  const handleCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, category: e.target.id });
  };

  // 옵션
  const handleOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.id;
    const isChecked = e.target.checked;

    if (isChecked) {
      setProduct({ ...product, options: [...product.options, value] });
    } else if (!isChecked && options.includes(value)) {
      setProduct({ ...product, options: options.filter((item) => item !== value) });
    }
  };

  // textfield
  const [imageFile, setImageFile] = useState<File | null>();
  const handleTextfields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setImageFile(files[0]);
      AdminUserService.uploadProductImg(files) //
        .then((url) => setProduct({ ...product, [name]: url }));
      return;
    }
    setProduct({ ...product, [name]: value });
  };

  // 상품 등록
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const submitNewProduct = async () => {
    for (let key in product) {
      const value = product[key];
      if (value === "" || (Array.isArray(value) && value.length === 0)) {
        alert("빈 칸을 모두 입력 해주세요.");
        return;
      }
    }

    setIsUploading(true);
    // todo
    // 옵션이 ALL일 경우 리스트 on,off
    // 옵션이 ALL일 경우 다른 리스트 off 한 경우
    // console.log(product.options.some((item) => item === "ALL") ? product.options.slice(1) : product.options);

    AdminUserService.setProduct({ ...product }) //
      .then(() => {
        setTimeout(() => {
          setIsUploading(false);
          setSuccess(true);
        }, 1000);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 3000);
      });
  };

  return (
    <ContentLayoutA>
      {success && (
        <div className="flex justify-center pb-9">
          <span className="text-base">
            <em className="not-italic text-[24px] align-top">😀</em> 상품이 성공적으로 등록되었습니다.
          </span>
        </div>
      )}

      <ContentTitle title="상품수정" />
      <div className="flex gap-x-10 w-full">
        <div className="flex flex-col gap-y-5 basis-full">
          <TextField type="file" label="상품 이미지" accept="image/*" name="image" onChange={handleTextfields} />
          <TextField type="text" label="상품명" value={title} name="title" onChange={handleTextfields} />
          <TextField type="number" label="가격" value={price} name="price" onChange={handleTextfields} />
          <TextField
            type="text"
            label="상품 설명"
            value={description}
            name="description"
            onChange={handleTextfields}
            multiline
          />

          <FormGroup direction="row" label="카테고리">
            <Radio
              id="top"
              value="상의"
              name="category"
              onChange={handleCategories}
              checked={"top" === category ? true : false}
            />
            <Radio
              id="bottom"
              value="하의"
              name="category"
              onChange={handleCategories}
              checked={"bottom" === category ? true : false}
            />
            <Radio
              id="dress"
              value="원피스"
              name="category"
              onChange={handleCategories}
              checked={"dress" === category ? true : false}
            />
            <Radio
              id="shoes"
              value="신발"
              name="category"
              onChange={handleCategories}
              checked={"shoes" === category ? true : false}
            />
            <Radio
              id="bag"
              value="가방"
              name="category"
              onChange={handleCategories}
              checked={"bag" === category ? true : false}
            />
          </FormGroup>

          <FormGroup direction="row" label="옵션">
            {/* <CheckBox
              id="ALL"
              value="전체"
              name="option"
              onChange={handleOptions}
              checked={options.includes("ALL") ? true : false}
            /> */}
            <CheckBox
              id="XS"
              value="XS"
              name="option"
              onChange={handleOptions}
              checked={options.includes("XS") ? true : false}
            />
            <CheckBox
              id="S"
              value="S"
              name="option"
              onChange={handleOptions}
              checked={options.includes("S") ? true : false}
            />
            <CheckBox
              id="M"
              value="M"
              name="option"
              onChange={handleOptions}
              checked={options.includes("M") ? true : false}
            />
            <CheckBox
              id="L"
              value="L"
              name="option"
              onChange={handleOptions}
              checked={options.includes("L") ? true : false}
            />
            <CheckBox
              id="XL"
              value="XL"
              name="option"
              onChange={handleOptions}
              checked={options.includes("XL") ? true : false}
            />
          </FormGroup>
        </div>

        {imageFile && (
          <div className="w-2/6 flex-none ">
            <img src={URL.createObjectURL(imageFile)} alt="상품 이미지" className="w-full h-auto" />
          </div>
        )}
      </div>

      <ContentBottomLayoutA>
        <Button
          text={isUploading ? "상품 등록 중 ...." : "상품수정"}
          size="full"
          variant="contain"
          onClick={submitNewProduct}
          disabled={isUploading || success ? true : false}
        />
      </ContentBottomLayoutA>
    </ContentLayoutA>
  );
};

export default UpdateProductContent;
