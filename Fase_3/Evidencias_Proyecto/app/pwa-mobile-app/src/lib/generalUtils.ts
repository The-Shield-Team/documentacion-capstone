export const formatTimeAgo = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diffDays === 0) return `Hoy a las ${formattedTime}`;
  if (diffDays === 1) return `Ayer a las ${formattedTime}`;
  if (diffDays < 7) return `Hace ${diffDays} días a las ${formattedTime}`;
  if (diffDays < 30)
    return `Hace ${Math.floor(diffDays / 7)} semanas a las ${formattedTime}`;
  if (diffDays < 365)
    return `Hace ${Math.floor(diffDays / 30)} meses a las ${formattedTime}`;
  return `Hace ${Math.floor(diffDays / 365)} años a las ${formattedTime}`;
};

type DeviceStatus = "available" | "occupied" | "default";

interface StatusConfig {
  color: string;
  tailwindClassColor: string;
  text: string;
}

const deviceStatusConfig: Record<DeviceStatus, StatusConfig> = {
  available: {
    color: "#10B981",
    tailwindClassColor: "text-green-500",
    text: "Disponible",
  },
  occupied: {
    color: "#EF4444",
    tailwindClassColor: "text-red-500",
    text: "Ocupado",
  },
  default: {
    color: "#6B7280",
    tailwindClassColor: "text-gray-500",
    text: "Desconocido",
  },
};

export const getDeviceStatusColor = (
  status: string,
  mode: "normal" | "tailwind",
): string => {
  if (mode === "tailwind") {
    return (
      deviceStatusConfig[status as DeviceStatus]?.tailwindClassColor ||
      deviceStatusConfig.default.tailwindClassColor
    );
  }
  return (
    deviceStatusConfig[status as DeviceStatus]?.color ||
    deviceStatusConfig.default.color
  );
};

export const getDeviceStatusText = (status: string): string => {
  return (
    deviceStatusConfig[status as DeviceStatus]?.text ||
    deviceStatusConfig.default.text
  );
};
