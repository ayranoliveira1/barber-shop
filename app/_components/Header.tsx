"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./Side-menu";
import Link from "next/link";

const Header = () => {
   return (
      <header>
         <Card>
            <CardContent className="flex flex-row justify-between p-5 items-center ">
               <Link href="/">
                  <Image src="/logo.png" alt="Barber" width={120} height={22} />
               </Link>
               <Sheet>
                  <SheetTrigger asChild>
                     <Button variant="outline" size="icon" className="w-8 h-8">
                        <MenuIcon size={16} />
                     </Button>
                  </SheetTrigger>
                  <SheetContent className="p-0">
                     <SideMenu />
                  </SheetContent>
               </Sheet>
            </CardContent>
         </Card>
      </header>
   );
};

export default Header;
