"use client";
import { AccountGuard } from "@/components/auth/AccountGuard";
import Page from "@/views/account/Profile";
export default function AccountPage() {
  return (
    <AccountGuard>
      <Page />
    </AccountGuard>
  );
}
