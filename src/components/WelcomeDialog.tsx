import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import sogenLogo from "@/assets/sogen-energy-logo.png";
import { imageSrc } from "@/lib/imageSrc";

const STORAGE_KEY = "sogen-welcome-dismissed";

export function WelcomeDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        const timer = setTimeout(() => setOpen(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleDismiss()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md sm:max-w-lg p-0 overflow-hidden">
        <div className="bg-primary px-6 py-6 sm:px-8 sm:py-8 flex items-center justify-center">
          <img
            src={imageSrc(sogenLogo)}
            alt="Sogen Energy"
            className="h-8 sm:h-10 w-auto"
          />
        </div>
        <div className="px-6 pt-5 pb-6 sm:px-8 sm:pt-6 sm:pb-8">
          <DialogHeader className="space-y-2 text-center sm:text-left">
            <DialogTitle className="text-xl sm:text-2xl font-bold">
              Welcome to Sogen Energy
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              You've been redirected from <span className="font-semibold text-foreground">SOK Battery NZ</span>.
              We're still the same company, same team, and same trusted products — just a fresh new name.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-5 sm:mt-6">
            <Button onClick={handleDismiss} className="w-full sm:w-auto sm:ml-auto" size="lg">
              Continue to site
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
