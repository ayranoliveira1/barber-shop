import { redirect } from "next/navigation";
import BarberShopItem from "../(home)/_components/Barbershop-item";
import Header from "../_components/Header";
import { db } from "../_lib/prisma";
import Search from "../(home)/_components/search";

interface BarbershopPageProps {
   searchParams: {
      search?: string;
   };
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
   if (!searchParams.search) {
      redirect("/");
   }

   const barbershops = await db.barbershop.findMany({
      where: {
         name: {
            contains: searchParams.search,
            mode: "insensitive",
         },
      },
   });

   return (
      <>
         <Header />

         <div className="px-5 py-6 flex flex-col xl:w-[86%] xl:mx-auto gap-6">
            <div className="xl:hidden">
               <Search
                  defaultValues={{
                     search: searchParams.search,
                  }}
               />
            </div>

            <h1 className="text-gray-400 font-bold text-xs uppercase">
               Resultados para &quot;{searchParams.search}&quot; ;
            </h1>

            <div className="grid grid-cols-2 xl:grid-cols-6 mt-3 gap-4">
               {barbershops.map((barbershop: any) => (
                  <div className="w-full" key={barbershop}>
                     <BarberShopItem barbershop={barbershop} />
                  </div>
               ))}
            </div>
         </div>
      </>
   );
};

export default BarbershopPage;
