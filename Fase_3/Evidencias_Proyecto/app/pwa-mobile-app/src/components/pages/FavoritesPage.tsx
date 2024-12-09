import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { fetchUserFavorites } from "@/services/favoritesService";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import FavoritesModalView from "../molecules/FavoritesModalView";

export function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const { user } = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      const data = await fetchUserFavorites(user ? user.id : "")
      console.log(data)
      setFavorites(data)
    }
    fetchReports()
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
        <h1 className="text-xl font-semibold flex-1 text-center mr-20">
          Favoritos
        </h1>
      </div>
      {favorites.map(favorite => {
        return (
          <>
            <Card>
              <CardHeader >
                <div>
                  <CardTitle>{favorite.devices.name}</CardTitle>
                  <CardDescription>{favorite.device_id}</CardDescription>
                </div>
                <div>
                  <FavoritesModalView 
                  id={favorite.id}
                  name={favorite.devices.name} 
                  description={favorite.device_id} 
                  created_at={new Date(favorite.created_at).toLocaleDateString('es-CL') }
                  mappedin_space_id={favorite?.devices?.rooms?.mappedin_space_id ? favorite.devices.rooms.mappedin_space_id : ""}
                  floor_id={favorite?.devices?.rooms?.floor?.mappedin_floor_id ? favorite.devices.rooms.floor.mappedin_floor_id : ""}
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
