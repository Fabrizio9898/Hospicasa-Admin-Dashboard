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
  PASSWORDS_DONT_MATCH = "Las contraseñas no coinciden",
  HASHING_FAILED = "Encriptado de contraseña fallido!",
  PASSWORD_SAME_AS_OLD = "La nueva contraseña no puede ser igual a la anterior",

  // User
  USER_DELETED = "Este usuario fue eliminado!",
  USER_DELETION_FAILED = "No se pudo eliminar este usuario",
  USER_RESTORED = "Usuario restaurado correctamente",
  USER_NOT_FOUND = "Usuario no encontrado",
  USER_UPDATE_FAILED = "Error al actualizar el usuario",
  USER_LIST_EMPTY = "La lista de usuarios está vacia",
  USER_UNBAN_OR_BAN = "No se pudo actualizar el estado baneado de este usuario",
  USER_RANKUP_FAILED = "No se pudo actualizar el rango de este usuario",
  USER_IS_THIRD_PARTY = "Este usuario se registró con una cuenta de terceros",
  USER_IS_LOCAL = "Este usuario se registró con una cuenta local",
  USER_HAS_RESERVATIONS = "Usuario tiene reservas activas",

  // Sport Center
  NO_CENTER_FOR_THIS_USER = "No hay centros deportivos para este usuario",
  CENTER_LIST_EMTPY = "No se encontraron centros deportivos",
  CENTER_CREATION_FAILED = "Creacion de  centro deportivo fallida",
  CENTER_NOT_FOUND = "No se pudo encontra este centro deportivo",
  CENTER_DELETION_SUCCESS = "Centro deportivo eliminado correctamente",
  CENTER_DELETION_FAILED = "No se pudo eliminar este centro deportivo",
  CENTER_ALREADY_HAS_STATE = "Este centro ya está en modo",
  CENTER_UPDATE_STATUS = "Estado del centro modificado",
  CENTER_UPDATE_STATUS_FAILED = "No se pudo modificar el estado del centro",
  CENTER_WRONG_OWNER = "La cuenta asociada con este centro deportivo no coincide",
  CENTER_HAS_NO_FIELDS = "Este centro deportivo no tiene canchas",
  CENTER_ALREADY_HAS_SCHEDULES = "El centro ya tiene horarios asignados",
  CENTER_SCHEDULES_CREATION_FAILED = "Fallo la creacion de horarios para el centro",
  CENTER_HAS_PENDING_RESERVATIONS = "El centro aun tiene reservaciones pendientes",
  CENTER_IS_NOT_COMPLETED = "El centro no se puede publicar porque no tiene asignado horarios o no tiene canchas",

  // Reviews
  REVIEW_CREATION_FAILED = "No se pudo crear una nueva reseña",
  REVIEW_DELETION_FAILED = "No se pudo eliminar esta reseña",
  REVIEW_DELETION_SUCCESS = "Reseña eliminada correctamente",
  REVIEWS_NOT_IN_CENTER = "No hay reseñas para este complejo!",
  FIELD_ALREADY_HAS_A_REVIEW = "Esta cancha ya tiene una reseña!",

  // Reservations
  RESERVATION_CREATED = "Reservacion agendada exitosamente",
  RESERVATION_NOT_FOUND = "No se encontró ninguna reserva",
  RESERVATION_ALREADY_CANCELED = "Esta reserva ya fue cancelada",
  RESERVATION_ALREADY_COMPLETED = "Esta reserva ya esta activada",
  INVALID_RESERVATION_STATUS = "Estado de la reserva invalido",
  RESERVATION_NOT_COMPLETED = "Se va a poder crear una reseña luego de la reserva haya sido completada",

  // Field
  FIELD_DELETED_SUCCESSFULLY = "Cancha eliminada correctamente",
  FIELD_DELETION_FAILED = "No se pudo eliminar esta cancha",
  FIELD_NOT_FOUND = "No se pudo encontrar esta cancha",
  FIELD_CREATION_FAILED = "No se pudo crear una nueva cancha",
  FIELD_BLOCK_CREATION_FAILED = "Se produjo un error creando los bloques de las canchas",
  FIELD_BLOCK_NOT_FOUND = "No se encontro el bloque de horario",
  FIELD_BLOCK_ALREADY_RESERVED = "Ya se reservo este horario",
  SPORTCENTER_NEEDS_SCHEDULES_BEFORE = "Necesitas crear horarios para el centro antes de crear una cancha ",
  CANT_CANCEL_RESERVATIONS = "No se pudo cancelar las reservas al eliminar una cancha",

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

  // Categories
  CATEGORY_ALREADY_EXISTS = "Ya hay una categoria con ese nombre!",
  CATEGORY_CREATION_FAILED = "No se pudo crear esta categoria",
  CATEGORY_NOT_FOUND = "No se encontró ninguna categoria",
  USER_ALREADY_HAS_A_CENTER = "Este usuario ya posee un centro deportivo registrado!",

  // General
  RANKING_UP_FAIL = "Error al mejorar el rango del usuario",
  RANKING_UP_SUCCESS = "El rol de este usuario ha cambiado",
  UNKNOWN_ERROR = "Algo salió mal",
  RESOURCE_NOT_FOUND = "Recurso no encontrado",
  UNAUTHORIZED = "Acceso denegado",
  NOTHING_UPDATED = "No se ha hecho ninguna actualizacion",
  INSUFFICIENT_PERMISSIONS = "No tienes permisos para hacer eso",
  NOT_ALLOWED_HERE = "No estás permitido aqui!",
  TEST_ERROR = "Error de prueba, debe ser eliminado en modo produccion!",
  RATING_OUT_OF_BOUNDS = "La calificacion debe estar entre 1 y 5",
  INVALID_DATE_FORMAT = "El formato de la fecha es invalido!",
  THIRD_PARTY_NOT_ALLOWED = "Usuarios externos no pueden cambiar su contraseña!",
}
