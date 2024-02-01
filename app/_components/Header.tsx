"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./Side-menu";

const Header = () => {
   return (
      <Card>
         <CardContent className="flex flex-row justify-between p-5 items-center">
            <Image src="/logo.png" alt="Barber" width={120} height={22} />
            <Sheet>
               <SheetTrigger>
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
   );
};

export default Header;
