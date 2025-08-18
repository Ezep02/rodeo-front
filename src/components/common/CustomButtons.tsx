import { Link } from "react-router-dom";

interface ButtonProps {
  text?: string;
  reference_url?: string;
  onClickAction?: () => void;
  icon?: any;
}

interface AuthenticationButtonProps {
  text: string;
  reference_url: string;
}


export const BookAnAppointmentButton: React.FC<ButtonProps> = ({
  text,
  reference_url,
}) => (
  <Link
    className="
        border-2 
        text-white py-2 px-4 rounded-lg shadow-md 
        
        transition-transform duration-300 ease-in-out 
        hover:shadow-lg 
        inline-flex items-center justify-center
      "
    to={reference_url!}
  >
    {text}
  </Link>
);

export const NavigateButton: React.FC<ButtonProps> = ({
  text,
  reference_url,
  icon
}) => (
  <Link to={reference_url!} className="flex gap-2 hover:text-zinc-200 text-zinc-50 w-full hover:bg-zinc-950 p-2 rounded-md shadow-sm">
    {icon && (
      <span className="items-center justify-center">
        {icon}
      </span>
    )}
    <span className="xl:hidden md:hidden group-hover:block block text-nowrap">
      {text}
    </span>
  </Link>
)


export const Button: React.FC<ButtonProps> = ({ text, onClickAction }) => (
  <button
    className="px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
    onClick={onClickAction}
  >
    
    {text}
  </button>
);

export const CancelButton: React.FC<ButtonProps> = ({
  text,
  onClickAction,
  icon
}) => (
  <button
    className="px-4 py-2 border text-zinc-700  text-sm font-medium rounded-2xl hover:text-zinc-500 transition-all flex items-center gap-1 hover:shadowactive:scale-95"
    onClick={onClickAction}
  >
    {icon && (
      <span className="text-zinc-800 text-xl flex items-center justify-center">
        {icon}
      </span>
    )}
    {text}
  </button>
);

export const OptionButton: React.FC<ButtonProps> = ({
  text,
  icon,
  onClickAction,
}) => (
  <button
    className="px-4 py-2 border text-zinc-700  text-sm font-medium rounded-2xl hover:text-zinc-500 transition-all flex items-center gap-1 hover:shadowactive:scale-95"
    onClick={onClickAction}
  >
    {icon && (
      <span className="text-zinc-800 text-xl flex items-center justify-center">
        {icon}
      </span>
    )}
    <span className="relative">
      {text}
      <span className="absolute -bottom-1 left-0 w-full h-1 bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></span>
    </span>
  </button>
);




export const LogInButton: React.FC<AuthenticationButtonProps> = ({
  text,
  reference_url,
}) => (
  <Link
    to={reference_url}
     className="px-4 py-2 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
  >
    {text}
  </Link>
);

export const RegistrationButton: React.FC<AuthenticationButtonProps> = ({
  text,
  reference_url,
}) => (
  <Link
    to={reference_url}
    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-2xl shadow hover:bg-zinc-700 transition-all"
  >
    {text}
  </Link>
);