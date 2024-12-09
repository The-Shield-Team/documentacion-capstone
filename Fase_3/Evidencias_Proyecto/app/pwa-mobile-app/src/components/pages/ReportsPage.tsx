import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ReportsModalView from "../molecules/ReportsModalView";
import { useEffect, useState } from "react";
import { fetchUserReports } from "@/services/reportsService";
import { useAuth } from "@/context/AuthProvider";
import { ReportsModalCreate } from "../molecules/ReportsModalCreate";

export function ReportsPage() {
  const [reports, setReports] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      const data = await fetchUserReports(user ? user.id : "");
      console.log(data);
      setReports(data);
    };
    fetchReports();
  }, []);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary/80"
        >
          <ChevronLeft size={24} />
          <span>Atrás</span>
        </button>
        <h1 className="text-xl font-semibold flex-1 text-center ml-10">Reportes</h1>
        <ReportsModalCreate />
      </div>
      {reports.map((report) => {
        return (
          <>
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>{report.devices.name}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </div>
                <div>
                  <ReportsModalView
                    name={report.devices.name}
                    description={report.description}
                    created_at={new Date(report.created_at).toLocaleDateString(
                      "es-CL",
                    )}
                  />
                </div>
              </CardHeader>
            </Card>
            <br />
          </>
        );
      })}
    </div>
  );
}
