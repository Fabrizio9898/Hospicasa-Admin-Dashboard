export enum TicketStatus {
  OPEN = "open", // Recién creado
  IN_PROGRESS = "in_progress", // Admin lo está revisando
  RESOLVED = "resolved", // Solucionado (cerrado)
  REJECTED = "rejected", // Reclamo inválido (cerrado)
}
