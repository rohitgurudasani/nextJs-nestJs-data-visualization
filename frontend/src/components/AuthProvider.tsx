"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface ContextValues {
  user: { token: string } | null;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}
interface IAuthContextProvider {
  children: React.ReactNode;
}

const UserContext = createContext<ContextValues | null>(null);

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState<{ token: string } | null>(null);
  const navigate = useRouter();

  const logIn = async (email: string, password: string) => {
    try {
      const user = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
        {
          email,
          password,
        }
      );
      if (user?.data) {
        setUser(user.data);
        localStorage.setItem("nestjs_nextjs_app", JSON.stringify(user.data));
      }
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`, {
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  };

  const logOut = () => {
    localStorage.clear();
    setUser(null);
    navigate.replace("/login");
  };

  useEffect(() => {
    const user = localStorage.getItem("nestjs_nextjs_app");
    console.log("user", user);

    if (user) {
      const json = JSON.parse(user);
      if (json.expiration < new Date().getTime()) {
        logOut();
        return;
      }

      setUser(json);
      navigate.replace("/");
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, logOut, logIn, signUp }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserContext);
};
