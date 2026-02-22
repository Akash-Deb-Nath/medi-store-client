"use client";

import { SessionContext} from "@/contexts/SessionContext";
import { User } from "@/types/user.type";



export default function SessionProvider({
  session,
  children,
}: {
  session: User;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}