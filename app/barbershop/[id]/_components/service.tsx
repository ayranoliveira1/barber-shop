import { db } from "@/app/_lib/prisma";
import ServiceItem from "./Service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

interface BarberShopDetailsPageProps {
   params: {
      id: string;
   };
}

const ServiceRomm = async ({ params }: BarberShopDetailsPageProps) => {
   const session = await getServerSession(authOptions);

   const barbershop = await db.barbershop.findUnique({
      where: {
         id: params.id,
      },
      include: {
         services: true,
      },
   });

   return (
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
   );
};

export default ServiceRomm;
