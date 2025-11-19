export enum TicketReason {
  // --- 1. BOOKING_ISSUE (Problema Turno) ---
  DOCTOR_NO_SHOW = "Profesional ausente (No se conectó)",
  PATIENT_NO_SHOW = "Paciente ausente (No se conectó)",
  RESCHEDULE_REQUEST = "Solicitud de cambio de horario / Reagendar",
  CANCELLATION_ERROR = "Problemas para cancelar el turno",
  TURN_CONFUSION = "Error al agendar / Confusión de fecha",

  // --- 2. PAYMENT_ISSUE (Problema Pago) ---
  PAYMENT_NOT_REFLECTED = "Pago realizado pero turno no confirmado",
  DOUBLE_CHARGE = "Cobro duplicado en tarjeta",
  REFUND_REQUEST = "Solicitud de reembolso (General)",
  INVOICE_REQUEST = "Solicitud de Factura A / B",
  CARD_REJECTION = "Error al procesar tarjeta / Pago rechazado",

  // --- 3. TECHNICAL_ISSUE (Falla Técnica) ---
  AUDIO_VIDEO_FAIL = "Falla de Audio/Video durante la consulta",
  CONNECTION_DROP = "Se cortó la conexión / Llamada interrumpida",
  APP_CRASH = "La App se cierra sola / Error crítico",
  NOTIFICATION_FAIL = "No recibí el link o notificación",

  // --- 4. ACCOUNT_ISSUE (Cuenta/Login) ---
  LOGIN_ERROR = "No puedo iniciar sesión / Olvidé contraseña",
  PROFILE_UPDATE = "Error al actualizar datos del perfil",
  IDENTITY_VERIFICATION = "Problemas con la validación de identidad",
  ACCOUNT_DELETION = "Solicitud de eliminación de cuenta",

  // --- 5. REPORT_USER (Reportar Usuario) ---
  OFFENSIVE_BEHAVIOR = "Comportamiento ofensivo / Acoso",
  UNPROFESSIONAL_CONDUCT = "Mala atención médica / Falta de ética",
  FAKE_PROFILE = "Posible suplantación de identidad / Perfil falso",
  SPAM_FRAUD = "Intento de estafa o Spam",

  // --- 6. OTHER (Otro) ---
  GENERAL_INQUIRY = "Consulta general / Dudas",
  OTHER = "Otro motivo no listado",
}
