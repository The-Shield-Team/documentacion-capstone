import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchLastUsedDevices } from "@/services/deviceUsage";
import { useAuth } from "@/context/AuthProvider";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import RecentsModalView from "../molecules/RecentsModalView";

export function RecentPage() {
  const [recents, setRecents] = useState([])
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const data = await fetchLastUsedDevices(user ? user.id : "");
      console.log(data);
      setRecents(data);
    };
    fetchReports();
  }, []
  )
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
        <h1 className="text-xl font-semibold flex-1 text-center mr-20">
          Recientes
        </h1>
      </div>
      {recents.map(recent => {
        return (
          <>
            <Card>
              <CardHeader >
                <div>
                  <CardTitle>{recent.devices.name}</CardTitle>
                  <CardDescription>{recent.device_id}</CardDescription>
                </div>
                <div>
                  <RecentsModalView
                    id={recent.devices.id}
                    name={recent.devices.name}
                    description={recent.device_id}
                    created_at={new Date(recent.created_at).toLocaleDateString('es-CL')}
                    mappedin_space_id={recent?.devices?.rooms?.mappedin_space_id ? recent.devices.rooms.mappedin_space_id : ""}
                    floor_id={recent?.devices?.rooms?.floor?.mappedin_floor_id ? recent.devices.rooms.floor.mappedin_floor_id : ""}
                  />
                </div>
              </CardHeader>
            </Card>
            <br />
          </>
        )
      })}
    </div>
  );
}
