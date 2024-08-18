import { db } from "@/app/_lib/prisma";
import BarberShopInfo from "./_components/Barbershop-info";
import Information from "./_components/information";
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/app/_components/ui/tabs";
import Header from "@/app/_components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import ServiceItem from "./_components/Service-item";
import InformXL from "./_components/inform-xl";

interface BarberShopDetailsPageProps {
   params: {
      id: string;
   };
}

const BarberShopDetailsPage = async ({
   params,
}: BarberShopDetailsPageProps) => {
   const session = await getServerSession(authOptions);

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
      <div className="">
         <div className="hidden xl:grid">
            <Header />
         </div>

         <div className="xl:w-[83%] xl:mx-auto xl:flex xl:gap-10 xl:mt-10 xl:rounded-2xl">
            <div className="xl:w-[65%] xl:rounded-2xl">
               <div className="xl:mx-auto xl:rounded-2xl">
                  <BarberShopInfo barbershop={barbershop} />
               </div>
               <div className="hidden xl:grid xl:justify-center">
                  <h3 className="text-lg font-bold pt-6 text-gray-400">
                     Serviços
                  </h3>
                  <div className="grid grid-cols-2 gap-4 pt-3 pb-6">
                     {barbershop.services.map((service: any) => (
                        <ServiceItem
                           key={service.id}
                           service={service}
                           isAuthenticated={!!session?.user}
                           barbershop={barbershop}
                        />
                     ))}
                  </div>
               </div>
            </div>

            <InformXL barbershop={barbershop} />
         </div>

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
               <div className="px-5 flex flex-col gap-4 py-6">
                  {barbershop.services.map((service: any) => (
                     <ServiceItem
                        key={service.id}
                        service={service}
                        isAuthenticated={!!session?.user}
                        barbershop={barbershop}
                     />
                  ))}
               </div>
            </TabsContent>
            <TabsContent value="information">
               <Information barbershop={barbershop} />
            </TabsContent>
         </Tabs>
      </div>
   );
};

export default BarberShopDetailsPage;
