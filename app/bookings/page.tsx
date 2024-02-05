import { getServerSession } from "next-auth";
import Header from "../_components/Header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/Booking-item";
import { isFuture, isPast } from "date-fns";

const BookingsPage = async () => {
   const session = await getServerSession(authOptions);

   if (!session?.user) {
      return redirect("/");
   }

   const bookings = await db.booking.findMany({
      where: {
         userId: (session.user as any).id,
      },
      include: {
         service: true,
         barbershop: true,
      },
   });

   const confirmedBookings = bookings.filter((bookings: any) =>
      isFuture(bookings.date)
   );

   const finishedBookings = bookings.filter((bookings: any) =>
      isPast(bookings.date)
   );

   return (
      <>
         <Header />

         <div className="px-5 py-6">
            <h1 className="text-xl- font-bold">Agendamentos</h1>

            <h2 className="text-sm uppercase text-gray-400 font-bold mt-6 mb-3">
               Confirmados
            </h2>

            <div className="flex flex-col gap-3">
               {confirmedBookings.map((booking: any) => (
                  <BookingItem key={booking.id} booking={booking} />
               ))}
            </div>

            <h2 className="text-sm uppercase text-gray-400 font-bold mt-6 mb-3">
               Finalizados
            </h2>

            <div className="flex flex-col gap-3">
               {finishedBookings.map((booking: any) => (
                  <BookingItem key={booking.id} booking={booking} />
               ))}
            </div>
         </div>
      </>
   );
};

export default BookingsPage;
