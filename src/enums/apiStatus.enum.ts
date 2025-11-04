export enum ApiStatusEnum {
  // Authentication
  LOGIN_SUCCESS = "Logeado correctamente",
  LOGIN_FAIL = "Error al iniciar sesión",
  INVALID_CREDENTIALS = "Credenciales invalidas!",
  TOKEN_EXPIRED = "La sesion ha expirado!",
  TOKEN_NOT_FOUND = "No se encontró ningún token en esta solicitud",
  NO_TOKEN_PROVIDED = "No se proporcionó ningún token",
  INVALID_TOKEN = "el token es invalido o ha expirado",
  TOKEN_SIGN_SUCCESSFUL = "firma de token exitosa",

  // Registration
  REGISTRATION_FAIL = "Error al registrar el usuario",
  REGISTRATION_SUCCESS = "Registrado correctamente",
  MAIL_IN_USE = "Este correo ya esta registrado!",

  // Password
  PASSWORD_UPDATE_SUCCESS = "Contraseña actualizada correctamente",
  PASSWORD_UPDATE_FAILED = "Error al actualizar la contraseña",
  HASHING_FAILED = "Encriptado de contraseña fallido!",
  PASSWORD_SAME_AS_OLD = "La nueva contraseña no puede ser igual a la anterior",
  PASSWORDS_DONT_MATCH = "Las contraseñas no coinciden",

  // Users
  USER_DELETED = "Este usuario fue eliminado!",
  USER_DELETION_FAILED = "No se pudo eliminar este usuario",
  USER_RESTORED = "Usuario restaurado correctamente",
  USER_NOT_FOUND = "Usuario no encontrado",
  USER_UPDATE_FAILED = "Error al actualizar el usuario",
  USER_LIST_EMPTY = "La lista de usuarios está vacia",
  USER_UNBAN_OR_BAN = "No se pudo actualizar el estado baneado de este usuario",
  USER_RANKUP_FAILED = "No se pudo actualizar el rango de este usuario",
  USER_HAS_RESERVATIONS = "Usuario tiene reservas activas",
  EMAIL_ALREADY_IN_USE = "Email already in use",

  // Reservations
  RESERVATION_CREATED = "Reservacion agendada exitosamente",
  RESERVATION_NOT_FOUND = "No se encontró ninguna reserva",
  RESERVATION_ALREADY_CANCELED = "Esta reserva ya fue cancelada",

  // Payments
  SUBSCRIPTION_PAYMENT_FAILED = "No se pudo crear el pago de la subscripcion",
  PAYMENT_NOT_FOUND = "Pago no entonctrado",
  PAYMENT_CREATION_FAILED = "No se pudo crear el pago",
  PAYMENT_ALREADY_EXISTS = "PAYMENT_ALREADY_EXISTS",

  // Images
  IMAGE_CREATION_FAILED = "No se pudo crear una nueva imagen",
  IMAGE_INSERTION_FAIL = "No se pudo insertar",
  IMAGE_TOCENTER_UPLOAD_SUCCESS = "Imagenes insertadas en el centro deportivo correctamente",
  IMAGE_TOCENTER_UPLOAD_FAILED = "No se pudo insertar la imagen al centro deportivo",
  IMAGE_TO_FIELD_UPLOAD_SUCCESS = "Imagen insertada en la cancha correctamente",
  NO_IMAGES_IN_REQUEST = "No se encontraron imagenes en esta peticion!",
  IMAGE_PROFILE_UPLOAD_FAILED = "No se pudo subir la imagen de perfil!",
  IMAGE_PROFILE_UPLOAD_SUCCESS = "Imagen de perfil subida correctamente",
  IMAGE_DELETION_FAILED = "No se pudo eliminar esta imagen!",
  IMAGE_NOT_FOUND = "No se pudo encontrar esta imagen!",
  IMAGE_DELETION_SUCCESS = "Imagen eliminada correctamente",
  MAX_IMAGES_REACHED = "Maximo de imagenes alcanzado, elimina una imagen antes de subir otra!",

  // General

  RANKING_UP_SUCCESS = "El rol de este usuario ha cambiado",
  UNKNOWN_ERROR = "Algo salió mal",
  RESOURCE_NOT_FOUND = "Recurso no encontrado",
  UNAUTHORIZED = "Acceso denegado",
  NOTHING_UPDATED = "No se ha hecho ninguna actualizacion",
  INSUFFICIENT_PERMISSIONS = "No tienes permisos para hacer eso",
  NOT_ALLOWED_HERE = "No estás permitido aqui!",
}
