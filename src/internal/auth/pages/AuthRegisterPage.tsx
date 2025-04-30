import { FormRegisterField } from '@/components/common/CustomInputForm';
import CustomToast from '@/components/common/ToastCustom';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext';
import { RegisterUserReq } from '@/models/AuthModels';
import { UserRegister } from '@/service/AuthService';
import { RegisterFormData, RegisterUserSchema } from '@/types/RegisterAuthTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useContext } from 'react'
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa6';
import { GiBullHorns } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const AuthRegisterPage = () => {

  const { setUser, setIsUserAuthenticated } = useContext(AuthContext)!;

  const [registerErr, registerAction, isRegisterPending] = useActionState(
    async (_: string | null, data: RegisterUserReq) => {

      try {
        const user = await UserRegister(data);
        setUser(user);
        setIsUserAuthenticated(true);
        if (user) {
          window.location.href = '/';
        }
        return null;
      } catch (error: any) {

        return error?.response?.data || "Error de autenticación";
      }
    },

    null // Estado inicial (null)
  );

  // Manejar el registro
  const handleRegister = (data: RegisterUserReq) => {
    startTransition(() => {
      registerAction(data);
    });
  };


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterUserSchema),
  });


  return (
    <div className="grid min-h-svh lg:grid-cols-2">

      <div className="flex flex-col gap-4 p-6 md:p-10">
        {
          registerErr && (
            <CustomToast message={registerErr} type="error" duration={3000} />
          )
        }
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {
              isRegisterPending ? (
                <div className="w-full flex justify-center items-center flex-col gap-1">
                  <p className="loader"></p>
                  <span>verificando informacion</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(handleRegister)}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h1 className="text-2xl font-bold  text-rose-500">
                      Listo para formar parte?
                    </h1>
                    <p className="text-balance font-medium text-sm text-zinc-500">
                      completa el formulario a continuacion
                    </p>
                  </div>

                  <div className="grid gap-6">

                    <div className='flex gap-1 w-full h-full flex-col lg:flex-row'>
                      <div className="grid gap-2">
                        <label htmlFor="name" className=" text-pretty font-medium text-sm">
                          Nombre
                        </label>
                        <FormRegisterField
                          type="text"
                          placeholder="Ingresar nombre"
                          name="name"
                          register={register}
                          error={errors.name}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="surname" className="text-pretty font-medium text-sm">
                          Apellido
                        </label>

                        <FormRegisterField
                          type="text"
                          placeholder="Ingresar apellido"
                          name="surname"
                          register={register}
                          error={errors.surname}
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-pretty font-medium text-sm">
                        Telefono
                      </label>

                      <FormRegisterField
                        type="text"
                        placeholder="Ingresar numero telefonico"
                        name="phone_number"
                        register={register}
                        error={errors.phone_number}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="emaul" className="text-pretty font-medium text-sm">
                        Email
                      </label>

                      <FormRegisterField
                        type="email"
                        placeholder="nombre@gmail.com"
                        name="email"
                        register={register}
                        error={errors.email}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="password" className="text-pretty font-medium text-sm">
                        Contraseña
                      </label>

                      <FormRegisterField
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        register={register}
                        error={errors.password}
                      />
                    </div>


                    <Button type="submit" className="w-full">
                      Registrarse
                    </Button>

                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                      <span className="relative z-10 px-2 text-muted-foreground text-zinc-600">O continua con</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      <i>
                        <FaGoogle />
                      </i>
                      Continuar con Google
                    </Button>
                  </div>

                  <div className="text-center text-sm">
                    ¿Ya tienes cuenta?{" "}

                    <Link to={"/auth/login"} className="underline underline-offset-4">
                      Iniciar Sesion
                    </Link>
                  </div>
                </form>
              )
            }


          </div>
        </div >
      </div >
      <div className="relative hidden bg-muted lg:block bg-zinc-950">
        <div className="flex justify-center items-center w-full h-full text-rose-600">
          <GiBullHorns size={60} />
        </div>
      </div>
    </div >
  )
}

export default AuthRegisterPage
