import { useState, useEffect, createContext, ReactNode } from "react";

export const AuthContext = createContext({});

interface ISignin {
  email: string;
  password: string;
}

interface IUser {
  email: string;
  password: string;
}

export function AuthProvider({ children }: { children: ReactNode}) {
  const [user, setUser] = useState({} || null);

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

    const hasUser = usersStorage?.filter((user: IUser) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("users_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuario não cadastrado";
    }
  }

  function singup({ email, password }: ISignin) {
    const usersStorage = JSON.parse(localStorage.getItem("users_db") || "{}");

    const hasUser = usersStorage?.filter((user: IUser) => user.email === email);

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("users_db", JSON.stringify(newUser));

    return;
  }

  function signout() {
    setUser(null);
    localStorage.removeItem("user_token");
  }

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, singup, signout }}
      children={children}
    />
  );
}
