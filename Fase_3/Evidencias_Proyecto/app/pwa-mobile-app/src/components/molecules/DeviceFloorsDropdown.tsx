import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DeviceFloorsDropdownProps {
  floors: { id: number; name: string }[];
  onFloorChange: (floorId: number | null) => void;
  selectedFloorId: number | null;
}

export default function DeviceFloorsDropdown({
  floors,
  onFloorChange,
  selectedFloorId,
}: DeviceFloorsDropdownProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="floor-select">Seleccionar Piso</Label>
      <Select
        defaultValue={selectedFloorId?.toString() || "all"}
        onValueChange={(value) => {
          const floorId = value === "all" ? null : Number(value);
          onFloorChange(floorId);
        }}
      >
        <SelectTrigger id="floor-select" className="w-full">
          <SelectValue placeholder="Todos los pisos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los pisos</SelectItem>
          {floors.map((floor) => (
            <SelectItem key={floor.id} value={floor.id.toString()}>
              {floor.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
