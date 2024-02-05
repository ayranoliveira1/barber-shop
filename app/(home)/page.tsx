import { format } from "date-fns";
import Header from "../_components/Header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/Booking-item";
import { db } from "../_lib/prisma";
import BarberShopItem from "./_components/Barbershop-item";

export default async function Home() {
   // Chamar prisma e pegar barbearias
   const barbershops = await db.barbershop.findMany({});

   return (
      <div>
         <Header />

         <div className="px-5 pt-5">
            <h2 className="text-xl font-bold">Olá, Miguel!</h2>
            <p className="capitalize text-sm">
               {format(new Date(), "EEEE',' d 'de' MMMM", {
                  locale: ptBR,
               })}
            </p>
         </div>

         <div className="px-5 mt-6">
            <Search />
         </div>

         {/* <div className="px-5 mt-6">
            <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
               Agendamentos
            </h2>
            <BookingItem />
         </div> */}

         <div className=" mt-6">
            <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">
               Recomendados
            </h2>
            <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
               {barbershops.map((barbershop: any) => (
                  <BarberShopItem key={barbershop.id} barbershop={barbershop} />
               ))}
            </div>
         </div>

         <div className=" mt-6 mb-[3rem]">
            <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">
               Populares
            </h2>
            <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
               {barbershops.map((barbershop: any) => (
                  <BarberShopItem key={barbershop.id} barbershop={barbershop} />
               ))}
            </div>
         </div>
      </div>
   );
}
