"use client";
import { AccountGuard } from "@/components/auth/AccountGuard";
import Page from "@/views/account/OrderDetail";

export default function AccountOrderDetailPage() {
  return (
    <AccountGuard>
      <Page />
    </AccountGuard>
  );
}
