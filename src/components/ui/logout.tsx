"use client";
import { logout } from "@/app/lib";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {}
    router.replace("/login");
  };

  return (
    <Button
      size={"sm"}
      variant={"ghost"}
      onClick={handleLogout}
      className="px-1 h-4"
    >
      Logout
    </Button>
  );
};

export default Logout;
