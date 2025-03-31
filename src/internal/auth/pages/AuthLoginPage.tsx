import { FormField } from "@/components/common/CustomInputForm";
import CustomToast from "@/components/common/ToastCustom";
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/context/AuthContext";
import { UserLogin } from "@/service/AuthService";
import { LoginFormData, LoginUserSchema } from "@/types/LoginAuthTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { GiBullHorns } from "react-icons/gi";
import { Link } from "react-router-dom";


const AuthLoginPage = () => {
    const { setUser, setIsUserAuthenticated, user } = useContext(AuthContext)!;

    const [loginErr, loginAction, isLoginPending] = useActionState(
        async (prevState: string | null, data: LoginFormData) => {
            try {
                let user = await UserLogin(data);
                setUser(user);
                setIsUserAuthenticated(true);
                if (user) {
                    window.location.replace('/');
                }
                return null;
            } catch (error: any) {
                return error?.response?.data || "Error de autenticación";
            }
        },
        null
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({ resolver: zodResolver(LoginUserSchema)});

    // Manejar login
    const handleLogin = (data: LoginFormData) => {
        startTransition(() => {
            loginAction(data);
        });
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">

            <div className="flex flex-col gap-4 p-6 md:p-10">
                {
                    loginErr && (
                        <CustomToast message={loginErr} type="error" duration={3000} />
                    )
                }
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        {
                            isLoginPending ? (
                                <div className="w-full flex justify-center items-center flex-col gap-1">
                                    <p className="loader"></p>
                                    <span>verificando informacion</span>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit(handleLogin)}
                                    className="flex flex-col gap-6"
                                >
                                    <div>
                                        <h1 className="text-2xl font-bold mb-4 text-center">
                                            El Rodeo
                                        </h1>
                                        <p className="text-balance font-medium text-sm text-zinc-600 text-center">
                                            Iniciar sesión en El Rodeo
                                        </p>
                                    </div>

                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <label htmlFor="email" className=" text-pretty font-medium text-sm">
                                                Email
                                            </label>
                                            <FormField
                                                type="email"
                                                placeholder="nombre@gmail.com"
                                                name="email"
                                                register={register}
                                                error={errors.email}
                                            />
                                        </div>

                                        <div className="grid gap-2">

                                            <div className="flex items-center">

                                                <label htmlFor="password" className="text-pretty font-medium text-sm">
                                                    Contraseña
                                                </label>

                                                <a href="/auth/recover" className="ml-auto text-sm underline-offset-4 hover:underline">
                                                    ¿Olvidaste la contraseña?
                                                </a>
                                            </div>

                                            <FormField
                                                type="password"
                                                placeholder="Contraseña"
                                                name="password"
                                                register={register}
                                                error={errors.password}
                                                current-password
                                            />
                                        </div>

                                        <Button type="submit" className="w-full">
                                            Iniciar Sesión
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
                                        ¿No tienes cuenta?{" "}

                                        <Link to={"/auth/register"} className="underline underline-offset-4">
                                            Registrarse
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
export default AuthLoginPage
