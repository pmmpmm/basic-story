import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "@/api/firebase";
import { UserInfo } from "@/api/firebase";
import Logo from "@/components/ui/Logo";
import { useQuery } from "@tanstack/react-query";

type User = UserInfo;

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState([]);
  const navigator = useNavigate();
  // firebase.adminUser().then((res) => {
  //   console.log(res);
  // });

  useEffect(() => {
    firebase.onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  const handleLogin = () => {
    firebase.login();
  };

  const handleLoout = () => {
    firebase.logout();
  };

  return (
    <header className="flex justify-between py-4">
      <Link to="/">
        <Logo />
      </Link>

      <div className="leading-5">
        <button
          onClick={() => {
            navigator("/cart");
          }}
          className="text-[13px]"
        >
          <span className="inline-block leading-5">장바구니</span>
          <em className="inline-block min-w-4 ml-[4px] px-[3px] py-[2px] bg-red-600 text-[10px] not-italic font-bold text-white leading-3 align-text-bottom rounded-full">
            5
          </em>
        </button>

        {!user && (
          <button
            onClick={handleLogin}
            className="text-[13px] ml-3 before:content-[''] before:inline-block before:w-[1px] before:h-[10px] before:mr-3 before:bg-gray-300 "
          >
            로그인
          </button>
        )}
        {user && (
          <>
            <button className="text-[13px] ml-3 before:content-[''] before:inline-block before:w-[1px] before:h-[10px] before:mr-3 before:bg-gray-300 ">
              {user.displayName} 님
            </button>
            {admin && (
              <button
                onClick={() => {
                  navigator("/products/new");
                }}
                className="text-[13px] ml-3 before:content-[''] before:inline-block before:w-[1px] before:h-[10px] before:mr-3 before:bg-gray-300 "
              >
                상품 등록
              </button>
            )}

            <button
              onClick={handleLoout}
              className="text-[13px] ml-3 before:content-[''] before:inline-block before:w-[1px] before:h-[10px] before:mr-3 before:bg-gray-300 "
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
