import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCountdown } from "../../hooks/useCountdown";
import { useState } from "react";

type CtaProps = {
  expires_at: Date | undefined;
  payment_url: string | undefined;
  is_payed: boolean;
};

export const CtaButton: React.FC<CtaProps> = ({
  expires_at,
  payment_url,
  is_payed,
}): React.ReactNode => {
  const { timeLeft, expired } = useCountdown(expires_at || "");

  const [redirecting, setRedirecting] = useState(false);

  const handleRedirect = () => {
    if (!payment_url) return;
    setRedirecting(true);
    window.location.href = payment_url;
  };

  // Si esta pago → "Como llegar"
  if (is_payed) {
    return (
      <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full active:scale-95">
        Como llegar
      </Button>
    );
  }

  // Si no está pago pero NO expiró → botón de pagar
  if (!expired && timeLeft !== "") {
    return (
      <Button
        className="rounded-full active:scale-[0.97] transition font-medium shadow-sm disabled:opacity-60"
        variant="default"
        onClick={handleRedirect}
        disabled={redirecting || expired || timeLeft === ""}
      >
        {redirecting && <Loader2 className="animate-spin mr-2" />}
        {timeLeft && !expired && "Confirmar pago"}

        {timeLeft ? (
          <div className="inline-flex items-center rounded-full font-medium">
            {expired ? "expirado" : timeLeft}
          </div>
        ) : (
          <div className="inline-flex items-center text-sm text-zinc-500 ml-2">
            <Loader2 size={16} className="animate-spin mr-1" />
            Calculando
          </div>
        )}
      </Button>
    );
  }

  // Expirado y no pagado → no mostrar pagar
  if (!expired && timeLeft === "") {
    return (
      <Button
        className="rounded-full active:scale-[0.97] transition font-medium shadow-sm disabled:opacity-60"
        variant="default"
        onClick={handleRedirect}
        disabled={true}
      >
        Como llegar
      </Button>
    );
  }

  return null;
};
