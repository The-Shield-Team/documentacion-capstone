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
import { Check, Plus, Skull } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/use-toast";

export function ReportsModalCreate() {
  const [reportData, setReportData] = useState({});
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const postReport = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await createUserReport(
        user.id,
        parseInt(reportData.deviceId),
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
        description: reportData.description && reportData.deviceId ? "No pudimos crear tu reporte en este momento, intentalo mas tarde" : "La descripciòn y id de un reporte son obligatorios",
        duration: 3000,
        icon: <Skull className="h-4 w-4 text-red-500" />,

      })
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          {" "}
          <Plus size={24} />
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
              placeholder="Id del equipo"
              className="col-span-3"
              type="number"
              onChange={(e) =>
                setReportData({ ...reportData, deviceId: e.target.value })
              }
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
