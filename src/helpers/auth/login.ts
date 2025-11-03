import { API_URL } from "../../config/envs.config";
import { LoginSchema } from "../../types/login-schema.type";
import { ErrorHelper, verifyError } from "../error/error.helper";

export async function login(userData: LoginSchema) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorResponse = await res.json();

      const errorMessage = errorResponse.message || "Error desconocido";

      throw new ErrorHelper(verifyError(errorMessage), res.status.toString());
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
