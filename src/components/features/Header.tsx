import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const Header = () => {
  return (
    <header className="flex justify-between py-3">
      <Link to="/">
        <Logo />
      </Link>

      <div>
        <Link
          to="/shopping-cart"
          className="text-[13px] mr-3 after:content-[''] after:inline-block after:w-[1px] after:h-[10px] after:ml-3 after:bg-gray-300 "
        >
          장바구니
        </Link>
        <Link
          to="/login"
          className="text-[13px] mr-3 after:content-[''] after:inline-block after:w-[1px] after:h-[10px] after:ml-3 after:bg-gray-300 "
        >
          로그인
        </Link>
        <Link to="/signup" className="text-[13px]">
          회원가입
        </Link>
      </div>
    </header>
  );
};

export default Header;
