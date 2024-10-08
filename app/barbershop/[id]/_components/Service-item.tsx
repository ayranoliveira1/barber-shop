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
import { Barbershop, Booking, Service } from "@prisma/client";
import { ptBR, tr } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../_actions/Save-booking";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../_actions/Get-day-bookings";
import BookingInfo from "@/app/_components/booking-info";

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
   const router = useRouter();

   const { data } = useSession();

   const [date, setDate] = useState<Date | undefined>(undefined);
   const [hour, setHour] = useState<string | undefined>();

   const [submitIsLoading, setSubmitIsLoading] = useState(false);
   const [sheetIsOpen, setSheetIsOpen] = useState(false);

   const [dayBookings, setDayBookings] = useState<Booking[]>([]);

   useEffect(() => {
      if (!date) {
         return;
      }

      const refreshAvailableHours = async () => {
         const _dayBookings = await getDayBookings(barbershop.id, date);

         setDayBookings(_dayBookings);
      };

      refreshAvailableHours();
   }, [date, barbershop.id]);

   const handleDateClick = (date: Date | undefined) => {
      setDate(date);
      setHour(undefined);
   };

   const handleHoursClick = (time: string) => {
      setHour(time);
   };

   const handleBookingClick = () => {
      if (!isAuthenticated) {
         return signIn("google");
      }
   };

   const handleBookingSubmit = async () => {
      setSubmitIsLoading(true);

      try {
         if (!hour || !date || !data?.user) {
            return;
         }

         const dateHour = Number(hour.split(":")[0]);
         const dateMinutes = Number(hour.split(":")[1]);

         const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

         await saveBooking({
            serviceId: service.id,
            barbershopId: barbershop.id,
            date: newDate,
            userId: (data.user as any).id,
         });

         setSheetIsOpen(false);
         setHour(undefined);
         setDate(undefined);
         toast("Reserva realizada com sucesso", {
            description: format(
               newDate,
               "'Para' dd 'de' MMMM 'as' HH':'mm'.'",
               {
                  locale: ptBR,
               }
            ),
            action: {
               label: "Vizualizar",
               onClick: () => router.push("/bookings"),
            },
         });
      } catch (error) {
         console.log(error);
      } finally {
         setSubmitIsLoading(false);
      }
   };

   const timeList = useMemo(() => {
      if (!date) {
         return [];
      }

      return generateDayTimeList(date).filter((time) => {
         // se tiver alguma reserva em dayBookings com a hora e minutos igual a time, não incluir

         const timeHour = Number(time.split(":")[0]);
         const timeMinutes = Number(time.split(":")[1]);

         const booking = dayBookings.find((booking) => {
            const bookingHour = booking.date.getHours();
            const bookingsMinutes = booking.date.getMinutes();

            return bookingHour === timeHour && bookingsMinutes === timeMinutes;
         });

         if (!booking) {
            return true;
         }

         return false;
      });
   }, [date, dayBookings]);

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
                     <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                        <SheetTrigger asChild>
                           <Button
                              variant="secondary"
                              onClick={handleBookingClick}
                           >
                              Reservar
                           </Button>
                        </SheetTrigger>

                        <SheetContent className="p-0">
                           <SheetHeader className="text-left px-5 py-4 border-b border-solid border-secondary">
                              <SheetTitle>Fazer Reserva</SheetTitle>
                           </SheetHeader>

                           <div className="py-">
                              <Calendar
                                 mode="single"
                                 selected={date}
                                 onSelect={handleDateClick}
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
                              <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden py-4 px-5 border-t border-solid border-secondary gap-3">
                                 {timeList.map((time) => (
                                    <Button
                                       onClick={() => handleHoursClick(time)}
                                       className="rounded-full"
                                       variant={
                                          hour === time ? "default" : "outline"
                                       }
                                       key={time}
                                    >
                                       {time}
                                    </Button>
                                 ))}
                              </div>
                           )}

                           <div className="px-5 py-4 border-t border-solid border-secondary">
                              <BookingInfo
                                 booking={{
                                    barbershop: barbershop,
                                    date:
                                       date && hour
                                          ? setMinutes(
                                               setHours(
                                                  date,
                                                  Number(hour.split(":")[0])
                                               ),
                                               Number(hour.split(":")[1])
                                            )
                                          : undefined,
                                    service: service,
                                 }}
                              />
                           </div>

                           <SheetFooter className="px-5">
                              <Button
                                 onClick={handleBookingSubmit}
                                 disabled={!hour || !date || submitIsLoading}
                                 size="full"
                              >
                                 {submitIsLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 )}
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
