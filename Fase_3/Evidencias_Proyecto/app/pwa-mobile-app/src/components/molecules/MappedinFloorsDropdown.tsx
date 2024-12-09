import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface MappedinFloorDropdownProps {
  floors: any[];
  onFloorChange: (floorId: string) => void;
  selectedFloorId: string | null;
  className?: string;
}

export default function MappedinFloorsDropdown({
  floors,
  onFloorChange,
  selectedFloorId,
  className,
}: MappedinFloorDropdownProps) {
  console.log(floors);

  return (
    <div className={cn("grid w-full items-center gap-1.5", className)}>
      <Label htmlFor="floor-select">Seleccionar Piso</Label>
      <Select value={selectedFloorId || ""} onValueChange={onFloorChange}>
        <SelectTrigger id="floor-select" className="w-full">
          <SelectValue placeholder="Seleccione un piso" />
        </SelectTrigger>
        <SelectContent>
          {[...floors]
            .sort((a, b) => b.id - a.id)
            .map((floor: any) => (
              <SelectItem key={floor.id} value={floor.mappedinFloorId || ""}>
                {floor.mappedinFloorId}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
