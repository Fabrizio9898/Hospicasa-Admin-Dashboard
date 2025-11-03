import { swalNotifySuccess } from "../../notifications/swal/success.notification";

export function logout(fire_swal: boolean): void {
  localStorage.removeItem("userSession");
  if (fire_swal) {
    swalNotifySuccess("¡Adiós!", "Tu sesión ha finalizado.");
  }

  window.location.href = "/api/auth/logout";
}
