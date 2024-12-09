import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAlerts } from "@/services/alertsService";
import { useEffect, useState } from "react";
import ReportsModalView from "../molecules/ReportsModalView";

export function AlertsPage() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const getAlerts = async () => {
      const data = await fetchAlerts();
      console.log(data);
      setAlerts(data);
    };
    getAlerts();
  }, []);

  return (
    <div className="space-y-4 p-6">
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-6">
          <h1 className="text-xl font-semibold flex-1 text-center">Alertas</h1>
        </div>
      </div>
      {alerts.map((alert) => {
        return (
          <>
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>{alert.title}</CardTitle>
                  <CardDescription>{alert.description}</CardDescription>
                </div>
                <div>
                  <ReportsModalView
                    name={alert.title}
                    description={alert.description}
                    created_at={new Date(alert.created_at).toLocaleDateString(
                      "es-CL",
                    )}
                  />
                </div>
              </CardHeader>
            </Card>
          </>
        );
      })}
    </div>
  );
}
