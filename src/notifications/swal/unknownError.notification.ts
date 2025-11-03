import Swal from "sweetalert2";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function swalNotifyUnknownError(error: any) {
  let title = "Error desconocido";
  let text = "";

  if (error.message !== null) {
    if (error.message === "response is undefined") {
      title = "Por favor, intenta más tarde.";
      text = "El servicio está temporalmente fuera de línea";
    }
  }

  Swal.fire({
    icon: "error",
    title: error.message || title,
    text,
  });
}
