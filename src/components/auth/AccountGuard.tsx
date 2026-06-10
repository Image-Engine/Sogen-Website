"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import type { ReactNode } from "react";

export function AccountGuard({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
