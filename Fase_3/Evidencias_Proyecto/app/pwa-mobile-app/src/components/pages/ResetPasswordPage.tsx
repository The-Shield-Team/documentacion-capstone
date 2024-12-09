import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  async function handleResetPassword() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      toast({
        title: "Correo enviado",
        description:
          "Revisa tu bandeja de entrada para restablecer tu contraseña",
        duration: 5000,
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el correo de restablecimiento",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">
            Restablecer Contraseña
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Correo electrónico
            </label>
            <Input
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoCapitalize="none"
            />
          </div>

          <Button
            className="w-full"
            onClick={handleResetPassword}
            disabled={loading || !email}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Enviar correo de restablecimiento"
            )}
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Volver al inicio de sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
