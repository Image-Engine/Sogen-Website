"use client";
import { AccountGuard } from "@/components/auth/AccountGuard";
import Page from "@/views/account/Orders";
export default function AccountPage() {
  return (
    <AccountGuard>
      <Page />
    </AccountGuard>
  );
}
