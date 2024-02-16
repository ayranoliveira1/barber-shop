"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
   CalendarIcon,
   LogInIcon,
   LogOutIcon,
   MenuIcon,
   UserIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./Side-menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
const Header = () => {
   const { data } = useSession();

   const handleLoginClick = () => {
      return signIn("google");
   };

   const handleLogoutClick = () => {
      return signOut();
   };

   return (
      <header>
         <Card>
            <CardContent className="flex flex-row justify-between p-5 xl:px-36 xl:py-8 items-center ">
               <Link href="/">
                  <Image src="/logo.png" alt="Barber" width={120} height={22} />
               </Link>

               <div className="hidden xl:flex xl:gap-3 xl:items-center">
                  <div>
                     {data?.user && (
                        <div className="flex flex-col gap-3 bg-[#1A1B1F] px-5 mt-2">
                           <Button
                              variant="ghost"
                              className="justify-start"
                              asChild
                           >
                              <Link href="/bookings">
                                 <CalendarIcon size={18} className="mr-2" />
                                 Agendamentos
                              </Link>
                           </Button>
                        </div>
                     )}
                  </div>

                  <div>
                     {data?.user ? (
                        <div className="flex gap-3 items-center">
                           <div className="flex items-center gap-3 ">
                              <Avatar className="w-8 h-8">
                                 <AvatarImage src={data.user?.image ?? ""} />
                              </Avatar>
                              <h2 className="font-bold">{data.user.name}</h2>
                           </div>
                           <Button variant="secondary" size="icon">
                              <LogOutIcon onClick={handleLogoutClick} />
                           </Button>
                        </div>
                     ) : (
                        <div className="flex flex-col gap-3">
                           <Button
                              className="w-full justify-start"
                              variant="secondary"
                              onClick={handleLoginClick}
                           >
                              <LogInIcon className="mr-2" size={18} />
                              Fazer login
                           </Button>
                        </div>
                     )}
                  </div>
               </div>

               <div className="xl:hidden">
                  <Sheet>
                     <SheetTrigger asChild>
                        <Button
                           variant="outline"
                           size="icon"
                           className="w-8 h-8"
                        >
                           <MenuIcon size={16} />
                        </Button>
                     </SheetTrigger>
                     <SheetContent className="p-0">
                        <SideMenu />
                     </SheetContent>
                  </Sheet>
               </div>
            </CardContent>
         </Card>
      </header>
   );
};

export default Header;
