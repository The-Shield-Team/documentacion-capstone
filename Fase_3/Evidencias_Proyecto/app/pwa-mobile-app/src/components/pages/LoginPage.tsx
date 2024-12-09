import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function signInWithEmail() {
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("Credenciales inválidas. Por favor, verifica tu correo y contraseña.");
      } else if (error.message.includes("Email not confirmed")) {
        setError("Por favor, confirma tu correo electrónico antes de iniciar sesión.");
      } else {
        setError("Ha ocurrido un error al iniciar sesión. Por favor, intenta de nuevo.");
      }
    } else {
      navigate("/");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">
            Health Care Item Recognition
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Contraseña
            </label>
            <Input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-right">
            <Button
              variant="link"
              className="px-0 text-sm text-muted-foreground"
              onClick={() => navigate("/reset-password")}
            >
              ¿Olvidaste tu contraseña?
            </Button>
          </div>

          <Button
            className="w-full"
            onClick={signInWithEmail}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
