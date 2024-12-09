import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (deviceId: string) => void;
}

export function QRScanner({ isOpen, onClose, onScan }: QRScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isProcessingScan = useRef(false);

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    } catch (error) {
      console.debug("Scanner already stopped");
    } finally {
      setScanning(false);
      isProcessingScan.current = false;
    }
  };

  const initializeScanner = async () => {
    if (scanning || !isOpen) return;

    try {
      await stopScanner(); // Asegurarse de que cualquier instancia previa esté limpia
      setError(null);

      // Verificar permisos de cámara
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
      } catch (err) {
        setError("Por favor, permite el acceso a la cámara para escanear");
        return;
      }

      const element = document.getElementById("qr-reader");
      if (!element) {
        setError("Error al inicializar el scanner");
        return;
      }

      element.innerHTML = "";
      
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;
      setScanning(true);

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        async (decodedText) => {
          if (isProcessingScan.current) return; // Evitar múltiples escaneos simultáneos
          isProcessingScan.current = true;

          try {
            let deviceId;
            try {
              const data = JSON.parse(decodedText);
              deviceId = data.deviceId;
            } catch {
              deviceId = decodedText;
            }

            if (deviceId) {
              await stopScanner();
              onScan(deviceId);
              onClose();
            } else {
              setError("Código QR inválido");
              isProcessingScan.current = false;
            }
          } catch (err) {
            setError("Código QR inválido o mal formateado");
            isProcessingScan.current = false;
          }
        },
        (error) => {
          if (!error.includes("QR code parse error")) {
            console.debug("QR scan error:", error);
          }
        }
      ).catch((err) => {
        console.error("Error starting camera:", err);
        setError("Error al iniciar la cámara. Intenta recargar la página.");
        setScanning(false);
      });
    } catch (err) {
      console.error("Error in scanner initialization:", err);
      setError(
        "Error al iniciar la cámara. Por favor, asegúrate de dar permisos de cámara y recargar la página."
      );
      setScanning(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        initializeScanner();
      }, 100);
    } else {
      stopScanner();
    }
    
    return () => {
      stopScanner();
    };
  }, [isOpen]);

  const handleClose = async () => {
    await stopScanner();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Escanear Código QR del Dispositivo</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div
            id="qr-reader"
            className="w-full max-w-[300px] aspect-square rounded-lg overflow-hidden bg-black"
          />

          {error && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <Button variant="outline" className="w-full" onClick={handleClose}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
