import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Calendar,
  Play,
  StopCircle,
  AlertCircle,
  Scan,
} from "lucide-react";
import { getDeviceStatusColor, getDeviceStatusText } from "@/lib/generalUtils";
import { useAuth } from "@/context/AuthProvider";
import { useDevice } from "@/hooks/useDevice";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { QRScanner } from "@/components/atoms/QRScanner";
import { FavoritesReportModal } from "./FavoritesReportModal";

interface DeviceDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  deviceData: {
    deviceId: number;
    deviceName: string;
    roomName: string;
    status: string;
    userName: string;
    userId: string;
    qr_uuid: string;
  };
}

export function DeviceDialog({
  isOpen,
  onOpenChange,
  deviceData,
}: DeviceDialogProps) {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const { user } = useAuth();
  const { isLoading, startUsingDevice, stopUsingDevice } = useDevice();
  const { toast } = useToast();

  const isCurrentUserDevice = deviceData.userId === user?.id;
  const isDeviceInUse = Boolean(deviceData.userId);
  const isDeviceAvailable = !isDeviceInUse || isCurrentUserDevice;

  const handleUseDevice = async (mode: "start" | "stop") => {
    if (mode === "stop") {
      try {
        await stopUsingDevice(deviceData.deviceId);
        toast({
          title: "Dispositivo liberado",
          description: `Has dejado de usar ${deviceData.deviceName}`,
          duration: 3000,
          icon: <StopCircle className="h-4 w-4 text-red-500" />,
        });
        onOpenChange?.(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Hubo un problema al procesar tu solicitud",
          variant: "destructive",
          duration: 3000,
          icon: <AlertCircle className="h-4 w-4 text-destructive" />,
        });
      }
    } else {
      // Si es "start", abrimos el scanner QR
      setIsQRScannerOpen(true);
    }
  };

  const handleQRScan = async (scannedDeviceId: string) => {
    // Limpiar posibles espacios en blanco y convertir a string
    const cleanScannedId = scannedDeviceId.trim();
    const currentDeviceId = deviceData.qr_uuid;

    console.log(cleanScannedId, currentDeviceId);

    if (cleanScannedId === currentDeviceId) {
      try {
        await startUsingDevice(deviceData.deviceId, user?.id || "");
        toast({
          title: "Dispositivo verificado",
          description: `Has comenzado a usar ${deviceData.deviceName}`,
          duration: 3000,
        });
        onOpenChange?.(false); // Cerrar el diálogo principal
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo iniciar el uso del dispositivo",
          variant: "destructive",
          duration: 3000,
        });
      }
    } else {
      toast({
        title: "Error de verificación",
        description: "El código QR no corresponde a este dispositivo",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] max-w-[350px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{deviceData.deviceName}</DialogTitle>
          <div className="pt-2 space-y-2">
            <div>
              <span>Ubicación:</span>
              <span className="ml-2 text-muted-foreground">
                {deviceData.roomName}
              </span>
            </div>
            <div>
              <span>Estado:</span>
              <span
                className={`ml-2 font-medium text-muted-foreground ${getDeviceStatusColor(
                  deviceData.status,
                  "tailwind",
                )}`}
              >
                {getDeviceStatusText(deviceData.status)}
              </span>
            </div>
            {deviceData.userName && (
              <div>
                <span>En uso por:</span>
                <span className="ml-2 font-medium text-muted-foreground">
                  {isCurrentUserDevice
                    ? `${deviceData.userName} (Tú)`
                    : deviceData.userName}
                </span>
              </div>
            )}
          </div>
          <DialogDescription className="text-left">
            {isDeviceInUse && !isCurrentUserDevice && (
              <span className="mt-4 text-sm text-muted-foreground">
                Actualmente{" "}
                <span className="font-medium">{deviceData.deviceName}</span>{" "}
                está siendo utilizado por{" "}
                <span className="font-medium">{deviceData.userName}</span>. Por
                favor, espera a que esté disponible o intenta usar otro
                dispositivo.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {(!isDeviceInUse || isCurrentUserDevice) && (
          <div className="flex flex-col gap-3 pt-4">
            <FavoritesReportModal device_id={deviceData.deviceId} />
            <Button
              className="w-full justify-start gap-2"
              onClick={() =>
                handleUseDevice(isCurrentUserDevice ? "stop" : "start")
              }
              disabled={!isDeviceAvailable || isLoading}
            >
              {isCurrentUserDevice ? (
                <>
                  <StopCircle className="text-primary-foreground" />
                  Dejar de usar
                </>
              ) : (
                <>
                  <Play className="text-primary-foreground" />
                  Comenzar Uso
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>

      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScan={handleQRScan}
      />
    </Dialog>
  );
}