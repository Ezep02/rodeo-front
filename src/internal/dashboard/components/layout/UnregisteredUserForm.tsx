
import { FormRegisterPaymentField } from "@/components/common/CustomInputForm";
import CustomToast from "@/components/common/ToastCustom";
import { Button } from "@/components/ui/button";
import { RegisterPaymentReq } from "@/models/AuthModels";
import { RegisterPaymentSchema } from "@/types/RegisterPaymentData";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";

type RegisterPaymentFormProps = {
    onClose: () => void;
    setUserData: (userData: RegisterPaymentReq) => void;
    
};

const UnregisteredUserForm: React.FC<RegisterPaymentFormProps> = ({onClose, setUserData}) => {
    const [registerErr, registerAction, isRegisterPending] = useActionState(
        async (_: string | null, data: RegisterPaymentReq) => {
            setUserData(data);
            onClose();
            
            return null;
        },

        null // Estado inicial (null)
    );

    // Manejar el registro
    const handleRegister = (data: RegisterPaymentReq) => {
        startTransition(() => {
            registerAction(data);
        });
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<RegisterPaymentReq>({
        resolver: zodResolver(RegisterPaymentSchema),
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-lg p-8 space-y-6">
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
                                            !Estas a un paso de lograrlo!
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
                                                <FormRegisterPaymentField
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

                                                <FormRegisterPaymentField
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

                                            <FormRegisterPaymentField
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

                                            <FormRegisterPaymentField
                                                type="email"
                                                placeholder="nombre@gmail.com"
                                                name="email"
                                                register={register}
                                                error={errors.email}
                                            />
                                        </div>

                                        <Button type="submit" className="w-full">
                                            Registrar datos
                                        </Button>
                                    </div>
                                </form>
                            )
                        }
                    </div>
                </div >
            </div>
        </div>
    );
};

export default UnregisteredUserForm;
