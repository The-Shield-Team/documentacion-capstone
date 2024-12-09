import { useMap, Label } from "@mappedin/react-sdk";

export function DoorLabels() {
  const { mapData, mapView } = useMap();

  mapData.getByType("space").forEach((space) => {
    mapView.updateState(space, {
      interactive: true,
      opacity: 0,
    });
  });
}
