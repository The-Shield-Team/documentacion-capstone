import { MapComponent } from "../molecules/MapComponent";
import CardButtonsMenu from "../molecules/CardButtonsMenu";
import FloorsDropdown from "../molecules/FloorsDropdown";
import { Spinner } from "../atoms/Spinner";
import { Legend } from "../atoms/Legend";
import { useBuildingData } from "@/hooks/useBuildingData";
import useMappedinSecrets from "@/hooks/useMappedinSecrets";

export function HomePage() {
	const {
		buildingData,
		selectedFloorId,
		specialAction,
		isLoading,
		error,
		setSelectedFloorId,
	} = useBuildingData();

	const { mappedinSecrets, loading  } = useMappedinSecrets();

	if (!mappedinSecrets || loading) {
		return (
			<div className="h-[80vh] flex justify-center items-center">
				<Spinner />
			</div>
		);
	}

	if (isLoading)
		return (
			<div className="h-[80vh] flex justify-center items-center">
				<Spinner />
			</div>
		);

	if (error || !buildingData)
		return (
			<div className="text-destructive text-center">
				<h2 className="text-lg font-semibold">Error</h2>
				<p className="text-sm">{error?.message || "No data available"}</p>
			</div>
		);

	const legendItems = [
		{ status: "Disponible", color: "#10B981" },
		{ status: "Ocupado", color: "#EF4444" },
	];

	return (
		<div className="flex flex-col gap-4 p-4">
			<MapComponent
				mappedinMapId={buildingData.mappedinMapId}
				mappedinKey={mappedinSecrets.mappedin_client}
				mappedinSecret={mappedinSecrets.mappedin_sec}
				specialAction={specialAction}
				selectedFloorId={selectedFloorId}
				onMapReady={(isReady) =>
					isReady && (
						<>
							<Legend items={legendItems} />
							<div className="w-full px-6">
								<FloorsDropdown
									floors={buildingData.floors}
									onFloorChange={setSelectedFloorId}
									selectedFloorId={selectedFloorId}
								/>
							</div>
							<div className="flex justify-center">
								<CardButtonsMenu />
							</div>
						</>
					)
				}
			/>
		</div>
	);
}
