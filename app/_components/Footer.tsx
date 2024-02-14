import { Mail, Phone } from "lucide-react";
import Image from "next/image";

const Footer = () => {
   return (
      <footer className="flex justify-center w-full bg-secondary pt-5 pb-5 px-3">
         <div className="flex flex-col gap-4 px-6">
            <div className="flex justify-center">
               <p className="font-bold text-2xl">
                  <Image src="/logo.png" alt="Barber" width={170} height={22} />
               </p>
            </div>

            <div className="flex flex-col gap-2">
               <p className="text-xl text-gray-300 text-center">Fale conosco</p>

               <div className="flex justify-center">
                  <Phone className=" text-gray-400 text-md pr-1 " />
                  <p className=" text-gray-400 text-md ">+55 32 98434-1504</p>
               </div>

               <div className="flex justify-center">
                  <Mail className=" text-gray-400 text-md pr-1 " />
                  <p className=" text-gray-400 text-md">
                     ayranoliveira1@gmail.com
                  </p>
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <p className="text-xl text-gray-300 text-center">
                  Transparência
               </p>
               <p className=" text-gray-400 text-md text-center">
                  Termos de uso
               </p>
               <p className=" text-gray-400 text-md text-center">
                  Política de privacidade
               </p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
