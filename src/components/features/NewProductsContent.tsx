import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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

const NewProductsContent = () => {
  // 상품 정보 세팅
  const [product, setProduct] = useState<ProductDomain>({
    category: "top",
    image: "",
    id: uuidv4(),
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
  const categories = [
    { id: "top", value: "상의", name: "category", onChange: handleCategories },
    { id: "bottom", value: "하의", name: "category", onChange: handleCategories },
    { id: "dress", value: "원피스", name: "category", onChange: handleCategories },
    { id: "shoes", value: "신발", name: "category", onChange: handleCategories },
    { id: "bag", value: "가방", name: "category", onChange: handleCategories }
  ];

  // 옵션
  const handleOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.id;
    const isChecked = e.target.checked;

    if (value === "ALL") {
      if (isChecked) {
        const optionsArray: string[] = [];
        optionList.forEach((item) => optionsArray.push(item.id));
        setProduct({ ...product, options: [...optionsArray] });
      } else {
        setProduct({ ...product, options: [] });
      }
      return;
    }
    if (isChecked) {
      setProduct({ ...product, options: [...product.options, value] });
    } else if (!isChecked && options.includes(value)) {
      setProduct({ ...product, options: options.filter((item) => item !== value) });
    }
  };
  const optionList = [
    { id: "ALL", value: "전체", name: "option", onChange: handleOptions },
    { id: "XS", value: "XS", name: "option", onChange: handleOptions },
    { id: "S", value: "S", name: "option", onChange: handleOptions },
    { id: "M", value: "M", name: "option", onChange: handleOptions },
    { id: "L", value: "L", name: "option", onChange: handleOptions },
    { id: "XL", value: "XL", name: "option", onChange: handleOptions }
  ];

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
  const textfield = [
    { type: "file", label: "상품 이미지", name: "image", accept: "image/*", onChange: handleTextfields },
    { type: "text", label: "상품명", name: "title", value: title, onChange: handleTextfields },
    { type: "number", label: "가격", name: "price", value: price, onChange: handleTextfields },
    { type: "text", label: "상품 설명", name: "description", value: description, onChange: handleTextfields }
  ];

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

    AdminUserService.writeProductData({ ...product }) //
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

      <ContentTitle title="상품등록" />

      <div className="flex gap-x-10 w-full">
        <div className="flex flex-col gap-y-5 basis-full">
          {textfield.map((item) =>
            item.accept ? (
              <TextField
                key={item.name}
                type={item.type}
                label={item.label}
                accept={item.accept}
                name={item.name}
                onChange={item.onChange}
              />
            ) : (
              <TextField
                key={item.name}
                type={item.type}
                label={item.label}
                value={item.value}
                name={item.name}
                onChange={item.onChange}
              />
            )
          )}

          <FormGroup direction="row" label="카테고리">
            {categories.map((item) => (
              <Radio
                key={item.id}
                id={item.id}
                value={item.value}
                name={item.name}
                onChange={item.onChange}
                checked={item.id === category ? true : false}
              />
            ))}
          </FormGroup>

          <FormGroup direction="row" label="옵션">
            {optionList.map((item) => (
              <CheckBox
                key={item.id}
                id={item.id}
                value={item.value}
                name={item.name}
                onChange={item.onChange}
                checked={options.includes(item.id) ? true : false}
              />
            ))}
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
          text={isUploading ? "상품 등록 중 ...." : "상품 등록"}
          size="full"
          variant="contain"
          onClick={submitNewProduct}
          disabled={isUploading || success ? true : false}
        />
      </ContentBottomLayoutA>
    </ContentLayoutA>
  );
};

export default NewProductsContent;
