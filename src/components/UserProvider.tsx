"use client";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";

// Define the User type with a nullable structure.
type User = {
  name: string | null;
  signature: string | null;
};

// Define the structure for the context, including the user and functions.
type UserContextType = {
  user: User;
  setCurrentUser: (username: string | null, password: string | null) => void;
  removeCurrentUser: () => void;
};

// Create the context with an initial undefined state.
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>({ name: null, signature: null });

  useEffect(() => {
    // Set user state based on localStorage after component mounts
    const storedName = localStorage.getItem("name");
    const storedSignature = localStorage.getItem("signature");
    if (storedName && storedSignature) {
      setUser({ name: storedName, signature: storedSignature });
    }
  }, []);

  const setCurrentUser = (username: string | null, password: string | null) => {
    if (username === "adminjannah" && password === "SA02") {
      localStorage.setItem("name", "Jannah Aleriosa");
      localStorage.setItem("signature", "/adminjannah.png");
      setUser({ name: "Jannah Aleriosa", signature: "/adminjannah.png" });
    } else if (username === "admincath" && password === "SA01") {
      localStorage.setItem("name", "Catherine Ferolin");
      localStorage.setItem("signature", "/admincath.jpg");
      setUser({ name: "Catherine Ferolin", signature: "/admincath.jpg" });
    }
  };

  const removeCurrentUser = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("signature");
    setUser({ name: null, signature: null });
  };

  return (
    <UserContext.Provider value={{ user, setCurrentUser, removeCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to check the current user and redirect if necessary.
export const CheckUser = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("Checking user...");
    const name = localStorage.getItem("name");
    if (name !== "Jannah Aleriosa" && name !== "Catherine Ferolin") {
      router.push("/login");
    }
  }, [router]);
};

// Custom hook to use the UserContext.
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  CheckUser(); // Ensure the user is checked after the initial render

  return context;
};
