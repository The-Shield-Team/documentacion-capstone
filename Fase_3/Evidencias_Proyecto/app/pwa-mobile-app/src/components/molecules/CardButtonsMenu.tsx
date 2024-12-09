import { IconButton } from "@/components/atoms/CardButton";
import { AlertTriangle, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardCards() {
  return (
    <div className="flex flex-row gap-4 p-4 overflow-x-auto">
      <Link to="/reports">
        <IconButton
          icon={AlertTriangle}
          label="Reportes"
          bgColor="bg-red-100"
          iconColor="text-red-500"
        />
      </Link>
      <Link to="/recent">
        <IconButton
          icon={Clock}
          label="Recientes"
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
      </Link>
      <Link to="/favorites">
        <IconButton
          icon={Star}
          label="Favoritos"
          bgColor="bg-emerald-100"
          iconColor="text-emerald-500"
        />
      </Link>
    </div>
  );
}
