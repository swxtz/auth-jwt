import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({});

interface ISignin {
  email: string;
  password: string;
}

interface IUser {
  email: string;
  password: string;
}

export function AuthProvider(children: any) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user: any) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  function signin({ email, password }: ISignin) {
    const usersStorage = JSON.parse(localStorage.getItem("users_db") || "{}");

    const hasUser = usersStorage?.filter((user:IUser) => user.email === email);

    if(hasUser?.length) {
      if(hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("users_token", JSON.stringify({email, token}));
        setUser({ email, password});
        return;
      }
    }
  }

  return <AuthContext.Provider children={children} value={false} />;
}
