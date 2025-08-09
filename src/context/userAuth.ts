import { createContext, useContext } from "react";

export interface UserAuthContextType {
  user: {
    $id: string;
    name: string;
    email: string;
  } | null;
  setUser: (user: UserAuthContextType["user"]) => void;
}
export const UserAuthContext = createContext<UserAuthContextType>({
  user: null,
  setUser: () => {},
});
export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};
export const UserAuthProvider = UserAuthContext.Provider;
