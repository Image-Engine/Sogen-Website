import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { useShopifyCustomer } from "@/contexts/ShopifyCustomerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Profile() {
  const { customer, updateCustomer } = useShopifyCustomer();
  const [firstName, setFirstName] = useState(customer?.firstName || "");
  const [lastName, setLastName] = useState(customer?.lastName || "");
  const [phone, setPhone] = useState(customer?.phoneNumber?.phoneNumber || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const ok = await updateCustomer({ firstName, lastName, phone });
    setSaving(false);
    if (ok) toast.success("Profile updated");
    else toast.error("Failed to update profile");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb />
      <main className="container py-12 max-w-lg">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <Card>
          <CardHeader><CardTitle>Your Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Email</Label><Input value={customer?.emailAddress?.emailAddress || ""} disabled /></div>
            <div><Label>First Name</Label><Input value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
            <div><Label>Last Name</Label><Input value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
            <div><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
