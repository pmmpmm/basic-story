import { useEffect, useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, authService } from "@/Firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import Logo from "@/components/ui/Logo";

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const navigator = useNavigate();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        setUserInfo(user.displayName);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setIsLogin(true);
        setUserInfo(data.user.displayName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoout = () => {
    signOut(auth)
      .then(() => {
        setIsLogin(false);
      })
      .catch((error) => console.log(error));
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

        {!isLogin && (
          <button
            onClick={handleLogin}
            className="text-[13px] ml-3 before:content-[''] before:inline-block before:w-[1px] before:h-[10px] before:mr-3 before:bg-gray-300 "
          >
            로그인
          </button>
        )}
        {isLogin && (
          <>
            <button className="text-[13px] ml-3 before:content-[''] before:inline-block before:w-[1px] before:h-[10px] before:mr-3 before:bg-gray-300 ">
              {userInfo} 님
            </button>
            <button
              onClick={() => {
                navigator("/products/new");
              }}
              className="text-[13px] ml-3 before:content-[''] before:inline-block before:w-[1px] before:h-[10px] before:mr-3 before:bg-gray-300 "
            >
              상품 등록
            </button>
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
