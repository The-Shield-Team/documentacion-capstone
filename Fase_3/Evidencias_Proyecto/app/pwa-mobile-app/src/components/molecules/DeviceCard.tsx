import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDeviceStatusColor } from "@/lib/generalUtils";
import { Device } from "@/services/deviceService";

interface DeviceCardProps {
  device: Device;
  onClick: (device: Device) => void;
}

export function DeviceCard({ device, onClick }: DeviceCardProps) {
  return (
    <Card
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => onClick(device)}
    >
      <CardContent className="p-4 flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="font-medium">{device.name}</h3>
          <p className="text-sm text-muted-foreground">
            {device.rooms?.name || "Sin ubicación"}
          </p>
          <p className="text-sm text-muted-foreground">
            {device.rooms?.floors?.name || "Sin ubicación"}
          </p>
        </div>
        <Badge
          variant="outline"
          style={{
            backgroundColor: getDeviceStatusColor(device.status, "normal"),
            color: "white",
          }}
        >
          {device.status === "available" ? "Disponible" : "En uso"}
        </Badge>
      </CardContent>
    </Card>
  );
}
