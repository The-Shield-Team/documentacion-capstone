import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function PWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 bg-card text-card-foreground p-6 rounded-lg shadow-lg border">
      <p className="text-sm mb-4">
        Install this app on your device for a better experience!
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={() => setShowPrompt(false)}>
          Not now
        </Button>
        <Button onClick={handleInstallClick}>Install</Button>
      </div>
    </div>
  );
}
