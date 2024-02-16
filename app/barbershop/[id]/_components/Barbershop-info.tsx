"use client";

import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import SideMenu from "@/app/_components/Side-menu";

interface BarberShopInfoProps {
   barbershop: Barbershop;
}

const BarberShopInfo = ({ barbershop }: BarberShopInfoProps) => {
   const router = useRouter();

   const handleBackClick = () => {
      router.replace("/");
   };

   return (
      <div>
         <div className="h-[250px] xl:h-[500px] w-full relative">
            <Button
               size="icon"
               variant="outline"
               className="z-50 top-4 left-4 absolute xl:hidden"
               onClick={handleBackClick}
            >
               <ChevronLeftIcon />
            </Button>

            <Sheet>
               <SheetTrigger>
                  <Button
                     size="icon"
                     variant="outline"
                     className="z-50 top-4 right-4 absolute xl:hidden"
                  >
                     <MenuIcon />
                  </Button>
               </SheetTrigger>

               <SheetContent className="p-0">
                  <SideMenu />
               </SheetContent>
            </Sheet>

            <Image
               src={barbershop.imageUrl}
               fill
               alt={barbershop.name}
               style={{ objectFit: "cover" }}
               className="opacity-75 xl:rounded-2xl"
            />
         </div>

         <div className="xl:px-0 px-5 pt-3 pb-6 border-b xl:border-none border-solid border-secondary xl:flex xl:justify-between ">
            <div>
               <h1 className="text-xl xl:text-2xl font-bold ">
                  {barbershop.name}
               </h1>
               <div className="flex items-center gap-2 mt-2">
                  <MapPinIcon className="text-primary" size={18} />
                  <p className="text-sm">{barbershop.address}</p>
               </div>
            </div>

            <div className="flex xl:flex-col items-center gap-2 mt-2 xl:rounded-md xl:bg-[#1A1B1F] xl:px-4 xl:pt-3">
               <div className="hidden xl:flex xl:gap-2 xl:items-center">
                  <StarIcon className="text-primary" size={22} />
                  <p className="text-xl">5,0</p>
               </div>
               <StarIcon className="xl:hidden text-primary" size={18} />
               <p className="xl:hidden text-sm">5,0</p>
               <p className="text-sm">(899 avaliações)</p>
            </div>
         </div>
      </div>
   );
};

export default BarberShopInfo;
