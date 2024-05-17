import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const Header = () => {
  return (
    <header className="flex justify-between px-df-A py-3">
      <Link to="/">
        <Logo />
      </Link>
      <div>
        <Link
          to="/"
          className="text-gray-500 mr-2 after:content-[''] after:inline-block after:w-[1px] after:h-[10px] after:ml-2 after:bg-gray-300 "
        >
          장바구니
        </Link>
        <Link
          to="/"
          className="text-gray-500 mr-2 after:content-[''] after:inline-block after:w-[1px] after:h-[10px] after:ml-2 after:bg-gray-300 "
        >
          로그인
        </Link>
        <Link to="/" className="text-gray-500 ">
          회원가입
        </Link>
      </div>
    </header>
  );
};

export default Header;
