import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { getDeviceStatusColor, getDeviceStatusText } from "@/lib/generalUtils";
import { useNavigate } from "react-router-dom";
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
    mappedinData: {
      spaceId: string;
      floorId: string;
    };
  };
}

export function DeviceDialog({
  isOpen,
  onOpenChange,
  deviceData,
}: DeviceDialogProps) {
  const navigate = useNavigate();

  const handleLocate = () => {
    // TODO: Implement locate functionality
    console.log("Ubicar dispositivo");
    navigate(
      `/?action=locate&spaceId=${deviceData.mappedinData.spaceId}&floorId=${deviceData.mappedinData.floorId}`,
    );
    onOpenChange?.(false);
  };

  const handleNearestRoute = () => {
    // TODO: Implement nearest route functionality
    console.log("Mostrar ruta más cercana");
    navigate(`/?action=nearestRoute&deviceId=${deviceData.deviceId}`);
    onOpenChange?.(false);
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
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleLocate}
          >
            <MapPin className="text-blue-500" />
            Ubicar
          </Button>
          <FavoritesReportModal device_id={deviceData.deviceId} />

        </div>
      </DialogContent>
    </Dialog>
  );
}
