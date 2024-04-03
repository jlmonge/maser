import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from ".";

// frontend now know the type of the backend; no data transferred, just type of router, which is removed at runtime. for typesafety
export const trpc = createTRPCReact<AppRouter>({});
