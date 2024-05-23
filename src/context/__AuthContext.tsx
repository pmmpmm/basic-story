import { UserDomain } from "@/domain/UserDomain";
import AuthService from "@/service/AuthService";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface AuthContextType {
  data: UserDomain | undefined;
}

interface Props {
  children: React.ReactNode;
}

const authContext = createContext<AuthContextType>({
  data: undefined
});

const AuthContextProvider = ({ children }: Props) => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: AuthService.getUser,
    staleTime: 1000 * 60 * 60
  });

  return <authContext.Provider value={{ data }}>{children}</authContext.Provider>;
};

const useAuthContext = () => useContext(authContext);
export { AuthContextProvider, useAuthContext };
