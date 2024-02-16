import { Card, CardContent } from "@/app/_components/ui/card";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import Image from "next/image";
import Information from "./information";
import { Barbershop, Prisma } from "@prisma/client";

interface BookingItemProps {
   barbershop: Barbershop;
}

const InformXL = ({ barbershop }: BookingItemProps) => {
   return (
      <div className="hidden xl:h-full xl:flex flex-col xl:w-[35%] xl:bg-[#1A1B1F] rounded-2xl px-6">
         <div className="relative h-[180px] w-full mt-6">
            <Image src="/barbershop-map.png" fill alt={barbershop?.name} />
            <div className="w-full absolute bottom-4 left-0 px-3">
               <Card>
                  <CardContent className="flex px-2 py-3 gap-2">
                     <Avatar>
                        <AvatarImage src={barbershop?.imageUrl} />
                     </Avatar>

                     <div>
                        <h2 className="font-bold">{barbershop?.name}</h2>
                        <h3 className="text-[11px] overflow-hidden text-ellipsis text-nowrap">
                           {barbershop?.address}
                        </h3>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>

         <Information />

         <div className="border-b border-solid border-secondary"></div>

         <div className="py-10 flex justify-between">
            <p>Em pareceria com </p>
            <Image src="/logo.png" alt="Barber" width={120} height={22} />
         </div>
      </div>
   );
};

export default InformXL;
