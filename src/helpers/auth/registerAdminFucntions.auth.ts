import { useState } from "react";
import { createAdminSchema, CreateAdminSchema } from "../../types/register-schema.type";
import { RegisterErrors } from "../../types/errorTypes.type";
import { swalNotifySuccess } from "../notifications/swal/success.notification";
import { swalCustomError } from "../notifications/swal/customError.notification";
import { zodValidate } from "../zod/zodValidation.helper";
import { createAdmin } from "../../api/utils/createAdmin.util";
import { swalNotifyUnknownError } from "../notifications/swal/unknownError.notification";
import { ErrorHelper } from "../error/error.helper";

export const useRegisterAdmin=()=>{
 const initialState: CreateAdminSchema = {
    email: "",
    fullname: "",
  };
  const [userData, setUserData] = useState<CreateAdminSchema>(initialState);
  const [errors, setErrors] = useState<RegisterErrors | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: rawValue } = event.target;
    const key = name as keyof CreateAdminSchema;
    let value = rawValue;
    if (key === "email") {
      value = value.toLowerCase();
    }
    setUserData({ ...userData, [key]: value });
    if (errors) {
      setErrors(null);
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (isSubmitting) return;
      setIsSubmitting(true);
  
      const validation = zodValidate<RegisterErrors>(userData, createAdminSchema);
  
      if (!validation.success) {
        setErrors(validation.errors);
        swalCustomError(
          "Error al registrar",
          "Por favor corrige los errores antes de continuar."
        );
        setIsSubmitting(false);
        return;
      }
      setErrors(null);
      try {
        const response = await createAdmin(userData);
        swalNotifySuccess(
          response.message || "¡Usuario creado exitosamente!",
          ""
        );
        setUserData(initialState);
      } catch (error) {
        if (error instanceof ErrorHelper) {
          swalCustomError("Error al crear usuario", error.message);
        } else {
          console.error("Error inesperado en handleSubmit:", error);
          swalNotifyUnknownError(error);
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    return {
        handleChange,handleSubmit,errors,isSubmitting,userData
    }
  
}