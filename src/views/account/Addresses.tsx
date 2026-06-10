import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { useShopifyCustomer } from "@/contexts/ShopifyCustomerContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import type { ShopifyAddress } from "@/types/shopifyCustomer";

const emptyAddress = { firstName: "", lastName: "", company: "", address1: "", address2: "", city: "", province: "", country: "New Zealand", zip: "", phone: "" };

export default function Addresses() {
  const { fetchAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } = useShopifyCustomer();
  const [addresses, setAddresses] = useState<(ShopifyAddress & { isDefault?: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<ShopifyAddress>>(emptyAddress);

  const load = async () => { const a = await fetchAddresses(); setAddresses(a); setLoading(false); };
  useEffect(() => { load(); }, [fetchAddresses]); // eslint-disable-line

  const openNew = () => { setEditingId(null); setForm(emptyAddress); setDialogOpen(true); };
  const openEdit = (a: ShopifyAddress) => { setEditingId(a.id); setForm(a); setDialogOpen(true); };

  const handleSave = async () => {
    const { id, isDefault, ...data } = form as any;
    if (editingId) {
      await updateAddress(editingId, data);
      toast.success("Address updated");
    } else {
      await createAddress(data);
      toast.success("Address created");
    }
    setDialogOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    await deleteAddress(id);
    toast.success("Address deleted");
    load();
  };

  const handleSetDefault = async (id: string) => {
    await setDefaultAddress(id);
    toast.success("Default address updated");
    load();
  };

  const updateField = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageBreadcrumb />
      <main className="container py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Addresses</h1>
          <Button onClick={openNew}><Plus className="h-4 w-4 mr-2" />Add Address</Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" /></div>
        ) : addresses.length === 0 ? (
          <p className="text-muted-foreground">No addresses saved.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((a) => (
              <Card key={a.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold">{a.firstName} {a.lastName}</p>
                    {a.isDefault && <Badge>Default</Badge>}
                  </div>
                  {a.company && <p className="text-sm text-muted-foreground">{a.company}</p>}
                  <p className="text-sm">{a.address1}</p>
                  {a.address2 && <p className="text-sm">{a.address2}</p>}
                  <p className="text-sm">{a.city}, {a.province} {a.zip}</p>
                  <p className="text-sm">{a.country}</p>
                  {a.phone && <p className="text-sm text-muted-foreground mt-1">{a.phone}</p>}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => openEdit(a)}><Pencil className="h-3 w-3 mr-1" />Edit</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(a.id)}><Trash2 className="h-3 w-3 mr-1" />Delete</Button>
                    {!a.isDefault && <Button variant="ghost" size="sm" onClick={() => handleSetDefault(a.id)}><Star className="h-3 w-3 mr-1" />Set Default</Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingId ? "Edit Address" : "Add Address"}</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>First Name</Label><Input value={form.firstName || ""} onChange={(e) => updateField("firstName", e.target.value)} /></div>
                <div><Label>Last Name</Label><Input value={form.lastName || ""} onChange={(e) => updateField("lastName", e.target.value)} /></div>
              </div>
              <div><Label>Company (optional)</Label><Input value={form.company || ""} onChange={(e) => updateField("company", e.target.value)} /></div>
              <div><Label>Address</Label><Input value={form.address1 || ""} onChange={(e) => updateField("address1", e.target.value)} /></div>
              <div><Label>Apartment, suite, etc. (optional)</Label><Input value={form.address2 || ""} onChange={(e) => updateField("address2", e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>City</Label><Input value={form.city || ""} onChange={(e) => updateField("city", e.target.value)} /></div>
                <div><Label>Province / State</Label><Input value={form.province || ""} onChange={(e) => updateField("province", e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Country</Label><Input value={form.country || ""} onChange={(e) => updateField("country", e.target.value)} /></div>
                <div><Label>Postal / Zip Code</Label><Input value={form.zip || ""} onChange={(e) => updateField("zip", e.target.value)} /></div>
              </div>
              <div><Label>Phone (optional)</Label><Input value={form.phone || ""} onChange={(e) => updateField("phone", e.target.value)} /></div>
              <Button onClick={handleSave}>{editingId ? "Update" : "Add"} Address</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
