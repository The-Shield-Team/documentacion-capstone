import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  bgColor: string;
  iconColor: string;
}

export function IconButton({
  icon: Icon,
  label,
  bgColor,
  iconColor,
}: IconButtonProps) {
  return (
    <Card className="p-4 flex flex-col items-center justify-center hover:bg-muted/50 transition-colors cursor-pointer min-w-[90px]">
      <div className={`rounded-full p-3 ${bgColor} mb-2`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <h2 className="text-sm text-muted-foreground font-medium text-center">
        {label}
      </h2>
    </Card>
  );
}
