import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  reference_url: string;
}

export const BookAnAppointmentButton: React.FC<
  ButtonProps
> = ({ text, reference_url }) => (
  <Link
    className="
        border-2 
        text-white py-2 px-4 rounded-lg shadow-md 
        
        transition-transform duration-300 ease-in-out 
        hover:shadow-lg 
        inline-flex items-center justify-center
      "
    to={reference_url}
  >
    {text}
  </Link>
);

export const NavigateButton: React.FC<ButtonProps> = ({text, reference_url}) => (

  <Link 
    
    to={reference_url}
  >
    {text}
  </Link>
)