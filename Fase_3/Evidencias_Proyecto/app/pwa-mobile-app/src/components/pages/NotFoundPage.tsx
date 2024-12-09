import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          404
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight">
          Página no encontrada
        </h2>
        <p className="text-muted-foreground">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Volver a la página de inicio
        </Button>
      </div>
    </div>
  );
}
