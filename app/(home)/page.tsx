import { format } from "date-fns";
import Header from "../_components/Header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/Booking-item";
import { db } from "../_lib/prisma";
import BarberShopItem from "./_components/Barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

const Home = async () => {
   const session = await getServerSession(authOptions);

   const [barbershops, recomendedBarbershop, confirmedBookings] =
      await Promise.all([
         await db.barbershop.findMany({}),
         await db.barbershop.findMany({
            orderBy: {
               id: "asc",
            },
         }),
         session?.user
            ? await db.booking.findMany({
                 where: {
                    userId: (session.user as any).id,
                    date: {
                       gte: new Date(),
                    },
                 },
                 include: {
                    service: true,
                    barbershop: true,
                 },
              })
            : Promise.resolve([]),
      ]);

   return (
      <div>
         <Header />

         <div className="">
            <div className="xl:bg-home xl:grid xl:px-32 xl:pt-10 xl:grid-cols-2 xl:pb-14">
               <div className="xl:pr-20">
                  <div className="px-5 pt-5">
                     <h2 className="text-xl xl:text-2xl font-bold">
                        {session?.user
                           ? `Olá, ${session?.user?.name?.split(" ")[0]}`
                           : "Olá! Vamos agendar uma corte Hoje?"}
                     </h2>
                     <p className="capitalize text-sm xl:text-md">
                        {format(new Date(), "EEEE',' d 'de' MMMM", {
                           locale: ptBR,
                        })}
                     </p>
                  </div>
                  <div className="px-5 mt-6">
                     <Search />
                  </div>
                  <div className="mt-6">
                     {confirmedBookings.length > 0 && (
                        <>
                           <h2 className="pl-5 text-xs uppercase text-gray-400 font-bold mb-3">
                              Agendamentos
                           </h2>
                           {confirmedBookings.map((booking: any) => (
                              <div
                                 className="flex px-5 mt-6 gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden"
                                 key={booking.id}
                              >
                                 <BookingItem booking={booking} />
                              </div>
                           ))}
                        </>
                     )}
                  </div>
               </div>

               <div className="mt-6">
                  <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">
                     Recomendados
                  </h2>
                  <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                     {recomendedBarbershop.map((barbershop: any) => (
                        <div
                           className="min-w-[167px] max-w-[167px] xl:min-w-[200px] xl:max-w-[200px]"
                           key={barbershop.id}
                        >
                           <BarberShopItem barbershop={barbershop} />
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="mt-8 mb-[3rem] xl:px-32">
               <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">
                  Populares
               </h2>
               <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {barbershops.map((barbershop: any) => (
                     <div
                        className="min-w-[167px] max-w-[167px] xl:min-w-[200px] xl:max-w-[200px]"
                        key={barbershop.id}
                     >
                        <BarberShopItem barbershop={barbershop} />
                     </div>
                  ))}
               </div>
            </div>

            <div className="hidden xl:flex xl:flex-col xl:mt-6 xl:mb-[3rem] xl:px-32">
               <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">
                  Mais visitados
               </h2>
               <div className="flex px-5 gap-4 overflow-x-hidden [&::-webkit-scrollbar]:hidden">
                  {recomendedBarbershop.map((barbershop: any) => (
                     <div
                        className="min-w-[200px] max-w-[200px]"
                        key={barbershop}
                     >
                        <BarberShopItem barbershop={barbershop} />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
