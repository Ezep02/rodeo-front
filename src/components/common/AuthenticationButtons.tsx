import { Link } from "react-router-dom";

interface AuthenticationButtonProps {
  text: string;
  reference_url: string;
}

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