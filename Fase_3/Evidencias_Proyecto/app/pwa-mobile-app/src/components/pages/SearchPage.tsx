import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DeviceDialog } from "@/components/molecules/DeviceDialogSearch";
import { DeviceCard } from "@/components/molecules/DeviceCard";
import { Spinner } from "@/components/atoms/Spinner";
import DeviceFloorsDropdown from "../molecules/DeviceFloorsDropdown";
import { Device, deviceService } from "@/services/deviceService";
import { useDeviceSearch } from "@/hooks/useDeviceSearch";

export function SearchPage() {
  const {
    devices,
    floors,
    selectedFloorId,
    selectedDevice,
    searchQuery,
    isLoading,
    error,
    isDialogOpen,
    setSearchQuery,
    setSelectedFloorId,
    setSelectedDevice,
    setIsDialogOpen,
  } = useDeviceSearch();

  if (isLoading) {
    return (
      <div className="h-[80vh]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive text-center">
        <h2 className="text-lg font-semibold">Error</h2>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold tracking-tight">Buscar Dispositivos</h1>

      <div className="flex flex-col gap-4">
        <DeviceFloorsDropdown
          floors={floors}
          onFloorChange={setSelectedFloorId}
          selectedFloorId={selectedFloorId}
        />

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onClick={handleDeviceClick}
          />
        ))}
      </div>

      {selectedDevice && (
        <DeviceDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          deviceData={deviceService.formatDeviceDetails(selectedDevice)}
        />
      )}
    </div>
  );
}
