import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserReport } from "@/services/reportsService";
import { Check, Plus, Skull, TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/use-toast";

export function FavoritesReportModal(device_id: { device_id: number }) {
  const [reportData, setReportData] = useState({});
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const postReport = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await createUserReport(
        user.id,
        device_id.device_id,
        reportData.description,
      );
      toast({
        title: "Reporte enviado",
        description: "Recibimos tu reporte",
        duration: 3000,
        icon: <Check className="h-4 w-4 text-green-500" />,

      })
      setOpen(false);
    } catch (error) {
      toast({
        title: "Ocurrió un error",
        description: reportData.description ? "No pudimos crear tu reporte en este momento, intentalo mas tarde" : "La descripciòn de un reporte es obligatoria",
        duration: 3000,
        icon: <Skull className="h-4 w-4 text-red-500" />,

      })
      setOpen(false);
    }
  };
  console.log("sapo: ", device_id)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2">
          {" "}
          <TriangleAlert size={24} className="text-destructive" />
          Reportar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reportar Equipo</DialogTitle>
          <br />
          <DialogDescription>Cuéntanos que se rompió.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Equipo Mèdico
            </Label>
            <Input
              id="deviceId"
              value={device_id.device_id}
              className="col-span-3"
              type="number"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Descripción
            </Label>
            <Input
              id="description"
              placeholder="Describe con detalle el problema"
              className="col-span-3"
              onChange={(e) =>
                setReportData({ ...reportData, description: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={postReport}>
            Reportar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
