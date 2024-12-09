import { Badge } from "@/components/ui/badge";

interface LegendItem {
  status: string;
  color: string;
}

interface LegendProps {
  items: LegendItem[];
}

export function Legend({ items }: LegendProps) {
  return (
    <div className="flex gap-1 justify-center items-center mb-2">
      {items.map((item) => (
        <Badge
          key={item.status}
          variant="outline"
          className="flex items-center gap-2"
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm capitalize">{item.status}</span>
        </Badge>
      ))}
    </div>
  );
}
