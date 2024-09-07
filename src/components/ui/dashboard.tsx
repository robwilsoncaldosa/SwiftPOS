import { CircleUser, LucideRocket, Wind } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import Logout from "./logout";
import { ModeToggle } from "../theme-toggler";

type User = {
  name: string;
  signature: string;
};

interface DashboardProps extends PropsWithChildren {}
export async function Dashboard({ children }: DashboardProps) {
  const currentUser: User | undefined = (() => {
    const sessionCookie = cookies().get("session")?.value;
    if (sessionCookie) {
      try {
        return JSON.parse(sessionCookie) as User;
      } catch (error) {
        console.error("Failed to parse session cookie", error);
      }
    }
    return undefined;
  })();

  return (
    <div className="grid min-h-screen w-full ">
      <div className="flex flex-col">
        <header className="flex h-14 justify-between items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center   h-full">
            <h1 className="text-2xl tracking tight">🚀 Swift-POS</h1>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant={"secondary"}
                  className="rounded-full"
                >
                  {currentUser && currentUser.name?.charAt(0)?.toUpperCase()}
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuLabel>{currentUser?.name}</DropdownMenuLabel>
                <DropdownMenuItem
                  className="pointer-events-none"
                  asChild
                ></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
