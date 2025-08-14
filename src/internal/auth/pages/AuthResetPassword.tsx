
import ErrorAlert from '@/components/alerts/ErrorAlert';
import { Button } from '@/components/ui/button';
import { ResetUserPassowrd } from '@/service/AuthService';
import { ResetPasswordFormData, ResetUserPasswordSchema } from '@/types/ResetPasswordTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useState } from 'react';

import { useForm } from 'react-hook-form';
import { GiBullHorns } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const AuthResetPassword = () => {
    const { token } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({ resolver: zodResolver(ResetUserPasswordSchema) });

    const [showError, setShowError] = useState<boolean>(false)
    const [resetPasswordErr, resetPasswordAction, isresetPasswordPending] = useActionState(
        async (_: string | null, data: ResetPasswordFormData) => {
            try {

                let res = await ResetUserPassowrd(data.password, token?.slice(6)!);
                console.log(res)

                return null;
            } catch (error: any) {
                setShowError(true)
                return error?.response?.data || "Error de autenticación";
            }
        },
        null
    );

    // Manejar login
    const handleResetPassword = (data: ResetPasswordFormData) => {
        startTransition(() => {
            resetPasswordAction(data)
        })
    };

    return (
        <div className='min-h-svh grid'>

            <div className='flex flex-col gap-4 p-6 md:p-10'>

                <ErrorAlert
                    message={resetPasswordErr}
                    show={showError}
                    onClose={() => setShowError(false)}
                />

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">{
                        isresetPasswordPending ? (
                            <div className="w-full flex justify-center items-center flex-col gap-1">
                                <p className="loader"></p>
                                <span>Verificando informacion</span>
                            </div>
                        ) : (
                            <form
                                className="flex flex-col gap-6"
                                onSubmit={handleSubmit(handleResetPassword)}
                            >

                                <div>
                                    <div className="flex justify-center items-center w-full h-full text-rose-500">
                                        <GiBullHorns size={60} />
                                    </div>
                                    <h1 className="text-2xl font-bold mb-4 text-center">
                                        El Rodeo
                                    </h1>
                                    <p className="text-balance font-medium text-sm text-zinc-600 text-center">
                                        Ingresa una nueva contraseña
                                    </p>
                                </div>

                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <label htmlFor="email" className=" text-pretty font-medium text-sm">
                                            Contraseña
                                        </label>
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="password"
                                                placeholder="Contraseña"
                                                {...register('password', { required: true })}
                                                autoFocus
                                                className="p-2 rounded-md  border  placeholder-gray-400 text-sm"
                                            />
                                            {errors && <span className="text-rose-600 text-pretty text-sm">{errors.password?.message}</span>}
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <label htmlFor="password" className="text-pretty font-medium text-sm">
                                            Confirmar contraseña
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Repite la contraseña"
                                            {...register('repeted_password', { required: true })}
                                            autoFocus
                                            className="p-2 rounded-md  border  placeholder-gray-400 text-sm"
                                        />
                                        {errors && <span className="text-rose-600 text-pretty text-sm">{errors.repeted_password?.message}</span>}
                                    </div>
                                </div>

                                <Button type="submit" className="w-full">
                                    Restablecer contraseña
                                </Button>

                                <div className="text-center text-sm">
                                    <Link to={"/auth/login"} className="underline underline-offset-4">
                                        Volver al inicio de sesion
                                    </Link>
                                </div>
                            </form>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthResetPassword
