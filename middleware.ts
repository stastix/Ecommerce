import { type NextRequest } from "next/server";
import { updateSession } from "@/app/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/checkout", "/payment"],
};
