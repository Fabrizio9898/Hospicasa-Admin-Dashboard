import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  InfiniteData, // <--- 1. IMPORTA ESTO
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getTickets, GetTicketsQuery } from "../api/utils/getTickets.util";
import { TicketResponse } from "../types/ticket.type";

type UseTicketsFilters = Omit<GetTicketsQuery, "page" | "limit">;

// 2. CORRIGE EL TIPO DE RETORNO AQUÍ ABAJO
// En lugar de UseInfiniteQueryResult<TicketResponse, AxiosError>
// Debe ser UseInfiniteQueryResult<InfiniteData<TicketResponse>, AxiosError>

export const useTicketsInfiniteQuery = (
  filters: UseTicketsFilters
): UseInfiniteQueryResult<InfiniteData<TicketResponse>, AxiosError> => {
  return useInfiniteQuery<TicketResponse, AxiosError>({
    queryKey: ["tickets", filters],

    queryFn: ({ pageParam = 1 }) => {
      return getTickets({
        ...filters,
        page: pageParam as number,
        limit: 6,
      });
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, lastPage: totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },

    retry: (failureCount, error) => {
      if (error.response?.status === 404) return false;
      return failureCount < 2;
    },
  });
};
