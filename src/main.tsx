import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/onest";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // (Opcional) Para que no refetchee si cambias de pestaña
      retry: 1, // (Opcional) Intentar solo 1 vez si falla
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <BrowserRouter>
       <App />
     </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
