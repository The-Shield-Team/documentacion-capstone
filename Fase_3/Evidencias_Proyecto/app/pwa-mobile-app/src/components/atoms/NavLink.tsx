import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavLinkProps {
  to: string;
  icon: string;
  label: string;
  isActive?: boolean;
}

export function NavLink({ to, icon, label, isActive }: NavLinkProps) {
  return (
    <Button
      variant="ghost"
      asChild
      className={cn(
        "relative h-10 shrink-0",
        isActive ? "w-auto px-4" : "w-14",
        "hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
        isActive && "text-primary hover:text-primary",
      )}
    >
      <Link to={to} className="flex flex-row items-center justify-center gap-2">
        <span className="material-icons text-3xl">{icon}</span>
        {isActive && <span className="text-sm font-medium">{label}</span>}
      </Link>
    </Button>
  );
}
