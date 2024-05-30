import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CategoryNav = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [activeNav, setActiveNav] = useState(category);

  const navs = [
    { title: "전체", value: "all" },
    { title: "상의", value: "top" },
    { title: "하의", value: "bottom" },
    { title: "원피스", value: "dress" },
    { title: "신발", value: "shoes" },
    { title: "가방", value: "bag" }
  ];
  return (
    <nav className="flex justify-center gap-16 px-dfX-A pt-5 pb-4 ">
      {navs.map((nav, idx) => {
        return activeNav ? (
          <button
            key={`category-${idx}`}
            value={nav.value}
            className={`px-2 font-medium relative
          ${activeNav === nav.value ? "font-extrabold text-gray-950 before:content-[''] before:block before:w-[calc(100%-1rem)] before:h-[1px] before:mx-2 before:bg-gray-950 before:absolute before:left-0 before:-bottom-0" : "text-gray-400"}
          `}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              const value = (e.target as HTMLButtonElement).value;
              navigate(`/products/${value}`);
              setActiveNav(value);
            }}
          >
            {nav.title}
          </button>
        ) : (
          <button
            key={`category-${idx}`}
            value={nav.value}
            className={`px-2 font-medium text-gray-800`}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              const value = (e.target as HTMLButtonElement).value;
              navigate(`/products/${value}`);
              setActiveNav(value);
            }}
          >
            {nav.title}
          </button>
        );
      })}
    </nav>
  );
};

export default CategoryNav;
