import { db } from "@/app/_lib/prisma";
import BarberShopInfo from "./_components/Barbershop-info";
import Information from "./_components/information";
import Service from "./_components/service";
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/app/_components/ui/tabs";

interface BarberShopDetailsPageProps {
   params: {
      id: string;
   };
}

const BarberShopDetailsPage = async ({
   params,
}: BarberShopDetailsPageProps) => {
   const barbershop = await db.barbershop.findUnique({
      where: {
         id: params.id,
      },
      include: {
         services: true,
      },
   });

   if (!barbershop) return null;

   return (
      <div>
         <BarberShopInfo barbershop={barbershop} />

         <Tabs className="mb-10 mt-6 xl:hidden" defaultValue="service">
            <TabsList className="gap-2.5 bg-transparent px-5">
               <TabsTrigger
                  value="service"
                  className="h-9 border border-solid border-[#26272B] text-sm font-bold text-white data-[state=active]:bg-primary"
               >
                  Serciços
               </TabsTrigger>
               <TabsTrigger
                  value="information"
                  className="h-9 border border-solid border-[#26272B] text-sm font-bold text-white data-[state=active]:bg-primary"
               >
                  Informações
               </TabsTrigger>
            </TabsList>
            <TabsContent value="service">
               <Service params={barbershop} />
            </TabsContent>
            <TabsContent value="information">
               <Information />
            </TabsContent>
         </Tabs>
      </div>
   );
};

export default BarberShopDetailsPage;
