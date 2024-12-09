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

const ReportsModalView = ({ name, description, created_at }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ver</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogFooter>{description}</DialogFooter>
          <DialogDescription>{created_at}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ReportsModalView;
