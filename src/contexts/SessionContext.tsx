"use client";

import { User } from "@/types/user.type";
import { createContext, useContext } from "react";

export const SessionContext = createContext<User|null>(null);

export const useSessionContext = () => useContext(SessionContext);