import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { useQuery } from "@tanstack/react-query";
import { UserRole } from "@/domain/UserDomain";
import queryClient from "@/service/QueryClient";
import AuthService from "@/service/AuthService";

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: AuthService.getUser,
    enabled: isLogin,
    staleTime: 1000 * 60 * 60
  });

  const handleLogin = () => {
    AuthService.login().then(() => {
      setIsLogin(true);
    });
  };

  const handleLoout = () => {
    AuthService.logout().then(() => {
      queryClient.removeQueries({ queryKey: ["user"] });
      setIsLogin(false);
      navigate("/");
    });
  };

  useEffect(() => {
    // 로그인 상태에 직접 url변경 시 어드민 경로 보호 확인용
    const accessToken = localStorage.getItem(import.meta.env.VITE_FIREBASE_ACCESS_TOKEN);
    accessToken ? setIsLogin(true) : setIsLogin(false);
  }, []);

  return (
    <header className="flex justify-between items-start py-4">
      <Link to="/">
        <Logo />
      </Link>
      <div className="flex items-center">
        {!data && <button onClick={handleLogin}>로그인</button>}
        {data && (
          <>
            <Link to="/cart" className="text-[13px]">
              <span>장바구니</span>
              <em className="inline-block min-w-4 ml-[4px] px-[3px] py-[2px] bg-red-600 leading-3 text-[10px] font-bold text-white text-center align-text-bottom rounded-full not-italic">
                5
              </em>
            </Link>

            <em className="inline-block w-[1px] h-[10px] mx-3 bg-gray-300"></em>
            <span className="text-[13px]">{data.name} 님</span>

            {data.role === UserRole.ADMIN && (
              <>
                <em className="inline-block w-[1px] h-[10px] mx-3 bg-gray-300"></em>
                <Link to="/products/new" className="text-[13px]">
                  상품 등록
                </Link>
              </>
            )}

            <em className="inline-block w-[1px] h-[10px] mx-3 bg-gray-300"></em>
            <button onClick={handleLoout} className="text-[13px]">
              로그아웃
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
