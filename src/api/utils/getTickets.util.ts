import axios from "axios";
import { ErrorHelper, verifyError } from "../../helpers/error/error.helper";
import api from "../api";
import { TicketCategory } from "../../enums/tickets/ticketCategory.enum";
import { UserRole } from "../../enums/userRole.enum";
import * as z from "zod";
import { TicketResponse, TicketResponseSchema } from "../../types/ticket.type";



export interface GetTicketsQuery {
  page: number;
  limit: number;
  categories?: z.infer<typeof TicketCategory>[];
  role?: z.infer<typeof UserRole> | "ALL";
}

/**
 * Obtiene la lista paginada de los tickets desde el backend.
 * @param query - Objeto con { role, categories, page, limit }
 */
export async function getTickets(
  query: GetTicketsQuery
): Promise<TicketResponse> {
  try {
    const roleToSend = query.role === "ALL" ? undefined : query.role;

    const response = await api.get("/admin/tickets", {
      params: {
        page: query.page,
        limit: query.limit,
        categories: query.categories,
        role: roleToSend,
      },
    });
console.log(response.data);

    return TicketResponseSchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "Error desconocido";
      throw new ErrorHelper(
        verifyError(errorMessage),
        error.response.status.toString()
      );
    }
    throw error;
  }
}
