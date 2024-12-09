import { useLocation } from "react-router-dom";
import { NavLink } from "../atoms/NavLink";

export function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe">
      <nav className="mx-auto flex h-16 max-w-md items-center justify-around rounded-full border bg-background/95 px-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <NavLink
          to="/"
          icon="home"
          label="Inicio"
          isActive={location.pathname === "/"}
        />
        <NavLink
          to="/search"
          icon="search"
          label="Buscar"
          isActive={location.pathname === "/search"}
        />
        <NavLink
          to="/alerts"
          icon="notifications"
          label="Alertas"
          isActive={location.pathname === "/alerts"}
        />
        <NavLink
          to="/settings"
          icon="settings"
          label="Configuración"
          isActive={location.pathname === "/settings"}
        />
      </nav>
    </div>
  );
}
