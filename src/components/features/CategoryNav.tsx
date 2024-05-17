import { Link } from "react-router-dom";

const CategoryNav = () => {
  return (
    <nav className="flex justify-center gap-16 px-dfX-A py-4">
      <Link to="/products" className="px-2">
        모든 제품
      </Link>
      <Link to="/products" className="px-2">
        상의
      </Link>
      <Link to="/products" className="px-2">
        하의
      </Link>
      <Link to="/products" className="px-2">
        원피스
      </Link>
      <Link to="/products" className="px-2">
        신발
      </Link>
      <Link to="/products" className="px-2">
        가방
      </Link>
    </nav>
  );
};

export default CategoryNav;
