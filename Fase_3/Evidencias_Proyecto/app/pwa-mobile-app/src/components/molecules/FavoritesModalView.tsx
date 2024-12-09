import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, MapPin, Skull, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FavoritesReportModal } from "./FavoritesReportModal";
import { deleteFavorite } from "@/services/favoritesService";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const FavoritesModalView = ({ id, name, description, created_at, mappedin_space_id, floor_id }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleLocate = () => {
    console.log("Ubicar dispositivo");
    navigate(
      `/?action=locate&spaceId=${mappedin_space_id}&floorId=${floor_id}`,
    );
  };

  const handleDelete = async () => {
    console.log("Eliminar dispositivo de favoritos");
    try {
      let countdown = 3;

      await deleteFavorite(id)
      setOpen(false);
      const { update } = toast({
        title: "Favorito eliminado",
        description: `Este dispositivo ya no está en tus favoritos. Recargando en ${countdown} segundos...`,
        action: <Button onClick={() => navigate(0)}>Recargar</Button>,
        duration: 3000,
        icon: <Check className="h-4 w-4 text-green-500" />,
      })

      const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          update({
            description: `Este dispositivo ya no está en tus favoritos. Recargando en ${countdown} segundos...`,
            id: ""
          });
        } else {
          clearInterval(interval);
          navigate(0); // Redirige después de que termine la cuenta regresiva
        }
      }, 1000);

    } catch (error) {
      console.log(error)
      toast({
        title: "Ocurrió un error",
        description: "No pudimos eliminar el dispositivo de tus favoritos, intentalo mas tarde",
        duration: 3000,
        icon: <Skull className="h-4 w-4 text-red-500" />,

      })
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant="outline">Ver</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogFooter>{description}</DialogFooter>
          <DialogDescription>Favorito desde: {created_at}</DialogDescription>
        </DialogHeader>
        <FavoritesReportModal device_id={description} />
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleLocate}
        >
          <MapPin className="text-blue-500" />
          Ubicar
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleDelete}
        >
          <Trash className="text-yellow-500" />
          Eliminar de favoritos
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default FavoritesModalView;