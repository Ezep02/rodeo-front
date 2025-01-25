import React from "react";
import { BookAnAppointmentButton } from "../../../components/common/CustomButtons";
import HomeGallery from "../components/layout/HomeGallery";


const HomePage: React.FC = () => {
 
  return (
    <div className="flex flex-col min-h-[100vh]">
  
      <main className="flex-1">
        <section className="relative h-[500px] overflow-hidden w-full ">

          <div className="absolute bg-zinc-900/75  inset-0 flex items-center justify-center">
            <div className="text-center text-primary-foreground space-y-4">
              <h1 className="text-4xl font-bold text-zinc-50">Bienvenido a El Rodeo</h1>
              <p className="text-lg">
                No solo es un corte, sino una experiencia.
              </p>
             
              <BookAnAppointmentButton text="Reservar turno" reference_url="/dashboard"/>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-muted">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Servicios destacados</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  {/* <ScissorsIcon className="w-8 h-8 text-primary" /> */}
                  <div>
                    <h3 className="text-xl font-bold">Classic Haircut</h3>
                    <p className="text-muted-foreground">
                      Our signature haircut, expertly tailored to your style.
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  {/* <RadarIcon className="w-8 h-8 text-primary" /> */}
                  <div>
                    <h3 className="text-xl font-bold">Straight Razor Shave</h3>
                    <p className="text-muted-foreground">
                      Experience the ultimate in close, smooth shaves.
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  {/* <CombineIcon className="w-8 h-8 text-primary" /> */}
                  <div>
                    <h3 className="text-xl font-bold">Beard Trim</h3>
                    <p className="text-muted-foreground">
                      Keep your facial hair looking sharp and well-groomed.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Sobre Nosotros</h2>
              <p className="text-muted-foreground">
                Barber's Lounge is a traditional barbershop that has been
                serving the community for over 50 years. Our skilled barbers are
                dedicated to providing the highest quality services in a
                welcoming, masculine environment. We take pride in our attention
                to detail and commitment to customer satisfaction.
              </p>
            </div>
          </div>
        </section>
        <HomeGallery />
      </main>



      <footer className="bg-primary text-primary-foreground py-6 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2024 El Rodeo</p>
          <div className="flex gap-4">
           
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
