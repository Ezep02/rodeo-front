import { useForm } from "react-hook-form";
import {
  RegisterFormData,
  RegisterUserSchema,
} from "../types/RegisterAuthTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { FormRegisterField } from "../../../components/common/CustomInputForm";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { User } from "../models/AuthModels";

const UserRegister = () => {


  return (
    <main className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-100 via-red-100 to-gray-50 ">
      
    </main>
  );
};

export default UserRegister;
