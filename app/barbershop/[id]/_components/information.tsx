"use client";

import { Button } from "@/app/_components/ui/button";
import { Smartphone } from "lucide-react";

const Information = () => {
   return (
      <div>
         <div className="w-full border-b border-solid border-secondary py-6">
            <p className="xl:px-0 px-5 pb-5 text-sm uppercase text-gray-400 font-bold">
               {" "}
               Sobre Nós
            </p>
            <p className="px-5 xl:px-0">
               Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa
               equipe de mestres barbeiros transforma cortes de cabelo e barbas
               em obras de arte. Em um ambiente acolhedor, promovemos confiança,
               estilo e uma comunidade unida.
            </p>
         </div>

         <div className="flex flex-col w-full py-6 gap-3 border-b border-solid border-secondary">
            <div className="xl:px-0 px-5 flex justify-between">
               <div className="flex gap-2">
                  <Smartphone />
                  <p>(11) 98204-5108</p>
               </div>
               <Button variant="secondary">Copiar</Button>
            </div>
            <div className="xl:px-0 px-5 flex justify-between">
               <div className="flex gap-2">
                  <Smartphone />
                  <p>(11) 99503-2351</p>
               </div>
               <Button variant="secondary">Copiar</Button>
            </div>
         </div>

         <div className="flex flex-col gap-2 w-full xl:px-0 px-5 pt-6 pb-8">
            <div className="flex justify-between">
               <p className="text-gray-400">Segunda</p>
               <p>Fechado</p>
            </div>
            <div className="flex justify-between">
               <p className="text-gray-400">Terça-Feira</p>
               <p>09:00 - 21:00</p>
            </div>
            <div className="flex justify-between">
               <p className="text-gray-400">Quarta-Feira</p>
               <p>09:00 - 21:00</p>
            </div>
            <div className="flex justify-between">
               <p className="text-gray-400">Quinta-Feira</p>
               <p>09:00 - 21:00</p>
            </div>
            <div className="flex justify-between">
               <p className="text-gray-400">Sexta-Feira</p>
               <p>09:00 - 21:00</p>
            </div>
            <div className="flex justify-between">
               <p className="text-gray-400">Sabado</p>
               <p>09:00 - 17:00</p>
            </div>
            <div className="flex justify-between">
               <p className="text-gray-400">Domingo</p>
               <p>Fechado</p>
            </div>
         </div>
      </div>
   );
};

export default Information;
