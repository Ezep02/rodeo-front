import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoginDialog from '../dialog/Login'
import { AuthContext } from '@/context/AuthContext';
import RegisterDialog from '../dialog/Register';

const HeroSection: React.FC = () => {

  const {
    setUser,
    setIsUserAuthenticated,
    isUserAuthenticated
  } = useContext(AuthContext)!;

  return (
    <div className="bg-white p-8 md:p-16 flex flex-col justify-between">

      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        Encontra un lugar
        <br />
        Donde prevalece la excelencia.
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl ">
        Tu próxima cita en la barbería a solo un toque de distancia — Reserva un turno en segundos, sin llamadas ni esperas
      </p>

      <div className="flex gap-4">

        {
          isUserAuthenticated ? (
            <Link to={"/reservation"} className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full text-sm flex items-center font-semibold">
              Reserva Ya - Es Facil
            </Link>
          ) : (
            <>

              <RegisterDialog
                setIsUserAuthenticated={setIsUserAuthenticated}
                setUser={setUser}
              />
              
              <LoginDialog
                setIsUserAuthenticated={setIsUserAuthenticated}
                setUser={setUser}
              />

            </>
          )
        }





      </div>
    </div>
  )
}

export default HeroSection
