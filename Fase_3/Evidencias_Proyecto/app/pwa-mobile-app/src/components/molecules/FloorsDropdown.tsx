import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FloorsDropdownProps {
  floors: { id: number; name: string; mappedinFloorId: string | null }[];
  onFloorChange: (floorId: string | null) => void;
  selectedFloorId: string | null;
}

export default function FloorsDropdown({
  floors,
  onFloorChange,
  selectedFloorId,
}: FloorsDropdownProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="floor-select">Seleccionar Piso</Label>
      <Select
        value={selectedFloorId || ""}
        onValueChange={(value) => {
          console.log("Selected floor:", value);
          onFloorChange(value);
        }}
      >
        <SelectTrigger id="floor-select" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {[...floors]
            .sort((a, b) => a.id - b.id)
            .map((floor) => (
              <SelectItem key={floor.id} value={floor.mappedinFloorId || ""}>
                {floor.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
