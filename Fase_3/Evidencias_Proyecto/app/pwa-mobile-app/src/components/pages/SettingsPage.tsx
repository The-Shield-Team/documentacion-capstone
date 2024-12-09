import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ModeToggle } from "../atoms/mode-toggle";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthProvider";

export function SettingsPage() {
  const { signOut } = useAuth();

  return (
    <div className="space-y-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred theme:</CardDescription>
        </CardHeader>
        <CardContent>
          <ModeToggle />
        </CardContent>
      </Card>

      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
