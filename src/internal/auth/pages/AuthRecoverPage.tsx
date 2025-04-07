import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SendEmailForData } from "@/models/AuthModels";
import { SendResetPasswordEmail } from "@/service/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";



const AuthRecoverPage = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SendEmailForData>({
    resolver: zodResolver(
      z.object({ email: z.string().email({ message: "Se debe ingresar un email" }), })
    ),
  })

  const [isSuccess, setIsSuccess] = useState(false)

  const [_, sendingEmailAction, isSubmitting] = useActionState(
    async (_: string | null, data: SendEmailForData) => {
      try {

        let sendingEamil = await SendResetPasswordEmail(data)
        console.log(sendingEamil)
        setIsSuccess(true)
        
        console.log(data)
        return null;
      } catch (error: any) {
        return error?.response?.data || "Error de autenticación";
      }
    },
    null
  );

  // Manejar envio de email
  const handleSendEmail = (data: SendEmailForData) => {
    startTransition(() => {
      sendingEmailAction(data);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader >
          <CardTitle className="text-2xl font-bold text-rose-500">¿Olvidaste tu contraseña?</CardTitle>
          <CardDescription>No te preocupes, te enviaremos instrucciones para restablecerla.</CardDescription>
        </CardHeader>
        <CardContent>
          {!isSuccess ? (
            <form onSubmit={handleSubmit(handleSendEmail)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className=" text-pretty font-medium text-sm">
                  Email
                </label>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="nombre@gmail.com"
                    {...register("email", { required: true })}
                    autoFocus
                    className="p-2 rounded-md  border placeholder-gray-400 text-sm"
                  />
                  {errors && <span className="text-rose-600 text-pretty text-sm">{errors.email?.message}</span>}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar instrucciones"
                )}
              </Button>
            </form>
          ) : (
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <h3 className="font-medium text-green-800">¡Correo enviado!</h3>
              <p className="mt-2 text-sm text-green-700">Hemos enviado las instrucciones de recuperación</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to={"/auth/login"} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver atrás
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AuthRecoverPage
