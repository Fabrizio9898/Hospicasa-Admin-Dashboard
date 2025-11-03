import Swal from "sweetalert2";
import { ErrorHelper, verifyError } from "../../error/error.helper";

// helpers/swal/swal-notify-error.ts
export function swalNotifyError(error: string | ErrorHelper) {
  // Si el error es un string, lo tratamos como tal
  const verified_error =
    typeof error === "string" ? verifyError(error) : verifyError(error.message);

  return Swal.fire({
    icon: "error",
    title: verified_error,
    text: typeof error === "string" ? error : error.error,
    allowOutsideClick: false,
  });
}
