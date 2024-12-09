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
import { Check, MapPin, Skull, Star, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FavoritesReportModal } from "./FavoritesReportModal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createFavorite } from "@/services/favoritesService";
import { useAuth } from "@/context/AuthProvider";

const RecentsModalView = ({ id, name, description, created_at, mappedin_space_id, floor_id }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleLocate = () => {
    console.log("Ubicar dispositivo");
    navigate(
      `/?action=locate&spaceId=${mappedin_space_id}&floorId=${floor_id}`,
    );
  };

  const handleCreate = async () => {
    console.log("Guardar dispositivo de favoritos");
    console.log(user?.id, id);
    try {
      await createFavorite(user ? user.id : "", id)
      setOpen(false);
      toast({
        title: "Favorito guardado",
        description: `Este dispositivo ahora está en tus favoritos.`,
        duration: 3000,
        icon: <Check className="h-4 w-4 text-green-500" />,
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Ocurrió un error",
        description: "No pudimos guardar el dispositivo de tus favoritos, intentalo mas tarde",
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
          onClick={handleCreate}
        >
          <Star className="text-yellow-500" />
          Guardar en favoritos
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RecentsModalView;