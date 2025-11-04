"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema, LoginSchema } from "../../types/login-schema.type";
import { LoginErrors } from "../../types/errorTypes.type";
import { zodValidate } from "../zod/zodValidation.helper";
import { swalNotifySuccess } from "../notifications/swal/success.notification";
import { swalCustomError } from "../notifications/swal/customError.notification";
import { login } from "./login";
import {
  LoginResponse,
  loginResponseSchema,
} from "../../types/loginResponse.type";
import { ErrorHelper } from "../error/error.helper";
import { swalNotifyUnknownError } from "../notifications/swal/unknownError.notification";
import { useAuthStore } from "../../store/auth.store";

export const useLoginFunctions = () => {
  const navigate = useNavigate();
  const initialState: LoginSchema = {
    email: "",
    password: "",
  };
  const zustandLoginAction = useAuthStore((state) => state.login);
  const [userData, setUserData] = useState<LoginSchema>(initialState);
  const [errors, setErrors] = useState<LoginErrors | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    checkUrlParams();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: rawValue } = event.target;
    const key = name as keyof LoginSchema;

    let value = rawValue;
    if (key === "email") {
      value = value.toLowerCase();
    }
    setUserData({ ...userData, [key]: value });

    // 3. Limpia los errores cuando el usuario corrige
    if (errors) {
      setErrors(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const validation = zodValidate<LoginErrors>(userData, loginSchema);

    if (!validation.success) {
      setErrors(validation.errors);
      swalCustomError(
        "Error en Logueo",
        "Por favor corrige los errores antes de continuar."
      );
      setIsSubmitting(false);
      return;
    }
    setErrors(null);
    try {
      const response: LoginResponse = await login(userData);

      const responseValidation = loginResponseSchema.safeParse(response);

      if (!responseValidation.success) {
        throw new Error("Respuesta inesperada del servidor.");
      }

      const { user, token } = responseValidation.data;

      zustandLoginAction({ user, token }); 
      swalNotifySuccess("¡Bienvenido!", "");
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof ErrorHelper) {
        swalCustomError("Error de Autenticación", error.message);
      } else {
        console.error("Error inesperado en handleSubmit:", error);
        swalNotifyUnknownError(error);
      }
      setIsSubmitting(false);
    }
  };

  // Verificar parámetros de URL para mensajes
  const checkUrlParams = () => {
    const queryString = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(queryString.entries()) as {
      from: string;
    };

    if (queryParams.from === "out_session") {
      swalCustomError(
        "La sesion ha expirado!",
        "Debes iniciar sesion nuevamente",
        [, 6000]
      );
    } else if (queryParams.from === "user_blocked") {
      swalCustomError(
        "No se pudo iniciar sesion",
        "Este usuario fue baneado!",
        [, 6000]
      );
    }
  };

  return {
    userData,
    setUserData,
    errors,
    isSubmitting,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    // checkUrlParams,
    initialState,
  };
};
