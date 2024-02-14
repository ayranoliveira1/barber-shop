import { Mail, Phone } from "lucide-react";

const Footer = () => {
   return (
      <footer className="w-full bg-secondary pt-2 pb-4 px-5">
         <div className="flex justify-between px-6">
            <div className="flex flex-col">
               <p className="text-lg text-gray-300 ">Fale conosco</p>

               <div className="flex">
                  <Phone className=" text-gray-400 text-xs pr-1 pt-2" />
                  <p className="pt-2 text-gray-400 text-xs font-bold opacity-75">
                     +55 32 98434-1504
                  </p>
               </div>

               <div className="flex">
                  <Mail className=" text-gray-400 text-xs pr-1 pt-2" />
                  <p className="pt-2 text-gray-400 text-xs font-bold opacity-75">
                     ayranoliveira1@gmail.com
                  </p>
               </div>
            </div>

            <div className="flex flex-col">
               <p className="text-lg text-gray-300 ">Transparência</p>
               <p className="pt-2 text-gray-400 text-xs font-bold opacity-75">
                  Termos de uso
               </p>
               <p className="pt-2 text-gray-400 text-xs font-bold opacity-75">
                  Política de privacidade
               </p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
