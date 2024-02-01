import { db } from "@/app/_lib/prisma";
import BarberShopInfo from "./_components/Barbershop-info";
import ServiceItem from "./_components/Service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarberShopDetailsPageProps {
   params: {
      id: string;
   };
}

const BarberShopDetailsPage = async ({
   params,
}: BarberShopDetailsPageProps) => {
   const session = await getServerSession(authOptions);

   if (!params.id) {
      // TODO: redirecionar para home page
      return null;
   }

   const barbershop = await db.barbershop.findUnique({
      where: {
         id: params.id,
      },
      include: {
         services: true,
      },
   });

   if (!barbershop) {
      // TODO: redirecionar para home page
      return null;
   }

   return (
      <div>
         <BarberShopInfo barbershop={barbershop} />

         <div className="px-5 flex flex-col gap-4 py-6">
            {barbershop.services.map((service: any) => (
               <ServiceItem
                  key={service.id}
                  service={service}
                  isAuthenticated={!!session?.user}
               />
            ))}
         </div>
      </div>
   );
};

export default BarberShopDetailsPage;
