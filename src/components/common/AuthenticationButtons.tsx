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
     className="hover:bg-red-600 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg"
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
    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
  >
    {text}
  </Link>
);