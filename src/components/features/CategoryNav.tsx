import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CategoryNav = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [activeNav, setActiveNav] = useState(category);

  const txColor = category ? "text-gray-500" : "text-gray-800";
  const navs = [
    { title: "전체", value: "all" },
    { title: "상의", value: "top" },
    { title: "하의", value: "bottom" },
    { title: "원피스", value: "dress" },
    { title: "신발", value: "shoes" },
    { title: "가방", value: "bag" }
  ];

  return (
    <nav className="flex justify-center gap-16 px-dfX-A pt-4 pb-3">
      {navs.map((nav, idx) => (
        <button
          key={`category-${idx}`}
          value={nav.value}
          className={`px-2 font-medium ${activeNav === nav.value ? "font-extrabold text-gray-950" : txColor}`}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            const value = (e.target as HTMLButtonElement).value;
            navigate(`/products/${value}`);
            setActiveNav(value);
          }}
        >
          {nav.title}
        </button>
      ))}
    </nav>
  );
};

export default CategoryNav;
