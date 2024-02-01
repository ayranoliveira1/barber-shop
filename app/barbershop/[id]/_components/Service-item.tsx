"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
   Sheet,
   SheetContent,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns";

interface ServiceItemProps {
   barbershop: Barbershop;
   service: Service;
   isAuthenticated?: boolean;
}

const ServiceItem = ({
   service,
   isAuthenticated,
   barbershop,
}: ServiceItemProps) => {
   const [date, setDate] = useState<Date | undefined>(undefined);

   const [hours, setHours] = useState<string | undefined>();

   const handleDateClick = (date: Date | undefined) => {
      setDate(date);
      setHours(undefined);
   };

   const handleHoursClick = (time: string) => {
      setHours(time);
   };

   const handleBookingClick = () => {
      if (!isAuthenticated) {
         return signIn("google");
      }
   };

   //TODO: abrir modal de argumentos

   const timeList = useMemo(() => {
      return date ? generateDayTimeList(date) : [];
   }, [date]);

   return (
      <Card>
         <CardContent className="p-3 w-full">
            <div className="flex gap-2 items-center w-full">
               <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                  <Image
                     className="rounded-lg"
                     src={service.imageUrl}
                     fill
                     style={{ objectFit: "contain" }}
                     alt={service.name}
                  />
               </div>

               <div className="flex flex-col w-full">
                  <h2 className="font-bold ">{service.name}</h2>
                  <p className="text-sm text-gray-400">{service.description}</p>

                  <div className="flex items-center justify-between mt-3">
                     <p className="text-primary font-bold">
                        {Intl.NumberFormat("pt-BR", {
                           style: "currency",
                           currency: "BRL",
                        }).format(Number(service.price))}
                     </p>
                     <Sheet>
                        <SheetTrigger asChild>
                           <Button
                              variant="secondary"
                              onClick={handleBookingClick}
                           >
                              Reservar
                           </Button>
                        </SheetTrigger>

                        <SheetContent className="p-0">
                           <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                              <SheetTitle>Fazer Reserva</SheetTitle>
                           </SheetHeader>

                           <div className="py-6">
                              <Calendar
                                 mode="single"
                                 selected={date}
                                 onSelect={handleDateClick}
                                 className="mt-6"
                                 locale={ptBR}
                                 fromDate={new Date()}
                                 styles={{
                                    head_cell: {
                                       width: "100%",
                                       textTransform: "capitalize",
                                    },
                                    cell: {
                                       width: "100%",
                                    },
                                    button: {
                                       width: "100%",
                                    },
                                    nav_button_previous: {
                                       width: "32px",
                                       height: "32px",
                                    },
                                    nav_button_next: {
                                       width: "32px",
                                       height: "32px",
                                    },
                                    caption: {
                                       textTransform: "capitalize",
                                    },
                                 }}
                              />
                           </div>

                           {/* Mostrar lista de horaios apenas se alguma data estiver selecionada */}
                           {date && (
                              <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden py-6 px-5 border-t border-solid border-secondary gap-3">
                                 {timeList.map((time) => (
                                    <Button
                                       onClick={() => handleHoursClick(time)}
                                       className="rounded-full"
                                       variant={
                                          hours === time ? "default" : "outline"
                                       }
                                       key={time}
                                    >
                                       {time}
                                    </Button>
                                 ))}
                              </div>
                           )}

                           <div className="py-6 px-5 border-t border-solid border-secondary">
                              <Card>
                                 <CardContent className="flex flex-col gap-3 p-3">
                                    <div className="flex justify-between">
                                       <h2 className="font-bold">
                                          {service.name}
                                       </h2>
                                       <h3 className="font-bold text-sm">
                                          {" "}
                                          {Intl.NumberFormat("pt-BR", {
                                             style: "currency",
                                             currency: "BRL",
                                          }).format(Number(service.price))}
                                       </h3>
                                    </div>

                                    {date && (
                                       <div className="flex justify-between">
                                          <h3 className="text-gray-400">
                                             Data
                                          </h3>
                                          <h4 className="text-sm capitalize">
                                             {format(date, "dd 'de' MMMM", {
                                                locale: ptBR,
                                             })}
                                          </h4>
                                       </div>
                                    )}

                                    {hours && (
                                       <div className="flex justify-between">
                                          <h3 className="text-gray-400">
                                             Horário
                                          </h3>
                                          <h4 className="text-sm capitalize">
                                             {hours}
                                          </h4>
                                       </div>
                                    )}

                                    <div className="flex justify-between">
                                       <h3 className="text-gray-400">
                                          Barbearia
                                       </h3>
                                       <h4 className="text-sm capitalize">
                                          {barbershop.name}
                                       </h4>
                                    </div>
                                 </CardContent>
                              </Card>
                           </div>
                           <SheetFooter className="px-5">
                              <Button disabled={!hours || !date}>
                                 Confirmar Reserva
                              </Button>
                           </SheetFooter>
                        </SheetContent>
                     </Sheet>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );
};

export default ServiceItem;
