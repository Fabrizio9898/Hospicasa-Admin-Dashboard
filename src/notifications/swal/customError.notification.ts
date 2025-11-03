import Swal, { SweetAlertPosition } from "sweetalert2";

/** Muestra un Error cutomizado que no permite click afuera, solo por medio de botones.
 * (Se puede encadenar con un .then() para llevar logica despues de dar click)
 */
export function swalCustomError(
  title: string,
  text?: string,
  options?: [position?: SweetAlertPosition | undefined, timer?: number]
) {
  let position_: SweetAlertPosition | undefined;
  let timer_: number | undefined;

  if (options) {
    const [position, timer] = options;
    [position_, timer_] = [position, timer];
  }

  position_ = position_ === undefined ? "top-end" : position_;

  const no_time: boolean = timer_ === 0 && timer_ !== undefined;

  const time_3000: boolean = timer_ === undefined;

  const Toast = Swal.mixin({
    toast: true,
    position: position_,
    showConfirmButton: no_time,
    timer: no_time ? undefined : time_3000 ? 3000 : timer_,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return Toast.fire({
    icon: "warning",
    title: title,
    text: text === "" ? undefined : text,
  });
}
