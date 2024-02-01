"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
   const { data } = useSession();

   const handleLoginClick = async () => {
      await signIn();
   };

   return (
      <Card>
         <CardContent className="flex flex-row justify-between p-5 items-center">
            <Image src="/logo.png" alt="Barber" width={120} height={22} />
            <Button variant="outline" size="icon" className="w-8 h-8">
               <MenuIcon size={16} />
            </Button>
         </CardContent>
      </Card>
   );
};

export default Header;
