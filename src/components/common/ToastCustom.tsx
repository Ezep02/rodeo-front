import { useState, useEffect } from "react";
import { XCircle, CheckCircle, AlertTriangle, X } from "lucide-react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "warning";
  duration?: number;
};

const CustomToast: React.FC<ToastProps> = ({ message, type = "success", duration = 4000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  const Icon = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
  }[type];

  return (
    <div className="fixed top-5 right-5 z-50">
      <div className={`flex items-center gap-3 p-4 rounded-lg shadow-lg ${typeStyles[type]}`}>
        <Icon className="w-6 h-6" />
        <span className="text-sm font-medium">{message}</span>
        <button onClick={() => setVisible(false)} className="ml-auto">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CustomToast;
