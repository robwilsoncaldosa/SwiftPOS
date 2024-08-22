import {
    CircleUser,
    LucideRocket,
    Wind
} from "lucide-react";

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


type User = {
    name: string;
    signature: string;
  };

interface DashboardProps extends PropsWithChildren {}
export  async function Dashboard({ children }: DashboardProps) {

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
        <header className="flex h-14 justify-end items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <div className="mr-auto flex items-center   h-full">
        
        <h1 className="text-2xl tracking tight">🚀 Swift-POS</h1>

        </div>
          
          <DropdownMenu>    
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">   
              <DropdownMenuLabel>{currentUser?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Logout/>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
