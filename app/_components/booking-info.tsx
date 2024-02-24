import { Barbershop, Booking, Service } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingInfoProps {
   booking: Partial<Pick<Booking, "date">> & {
      service: Pick<Service, "name" | "price">;
      barbershop: Pick<Barbershop, "name">;
   };
}

const BookingInfo = ({ booking }: BookingInfoProps) => {
   return (
      <Card>
         <CardContent className="flex flex-col sm:gap-2 gap-3 p-3">
            <div className="flex justify-between">
               <h2 className="font-bold sm:text-xs">{booking.service.name}</h2>
               <h3 className="font-bold text-sm sm:text-xs">
                  {" "}
                  {Intl.NumberFormat("pt-BR", {
                     style: "currency",
                     currency: "BRL",
                  }).format(Number(booking.service.price))}
               </h3>
            </div>

            {booking.date && (
               <>
                  <div className="flex justify-between">
                     <h3 className="text-gray-400 sm:text-xs">Data</h3>
                     <h4 className="text-sm sm:text-xs capitalize">
                        {format(booking.date, "dd 'de' MMMM", {
                           locale: ptBR,
                        })}
                     </h4>
                  </div>

                  <div className="flex justify-between">
                     <h3 className="text-gray-400 sm:text-xs">Horário</h3>
                     <h4 className="text-sm capitalize sm:text-xs">
                        {format(booking.date, "hh:mm")}
                     </h4>
                  </div>
               </>
            )}

            <div className="flex justify-between">
               <h3 className="text-gray-400 sm:text-xs">Barbearia</h3>
               <h4 className="text-sm capitalize sm:text-xs">
                  {booking.barbershop.name}
               </h4>
            </div>
         </CardContent>
      </Card>
   );
};

export default BookingInfo;
