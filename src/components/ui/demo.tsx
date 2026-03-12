import { useState } from "react";
import type { LatLng } from "leaflet";
import { AdvancedMap, type CircleData, type MarkerData, type PolygonData } from "@/components/ui/interactive-map";

export default function DemoOne() {
  const [markers] = useState<MarkerData[]>([
    {
      id: 1,
      position: [51.505, -0.09],
      color: "blue",
      size: "medium",
      popup: {
        title: "Central London",
        content: "Popular event and dining zone.",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: 2,
      position: [51.51, -0.1],
      color: "red",
      size: "large",
      popup: {
        title: "Westminster",
        content: "A second sample pin for route planning.",
      },
    },
  ]);

  const polygons: PolygonData[] = [
    {
      id: 1,
      positions: [
        [51.515, -0.09],
        [51.52, -0.1],
        [51.52, -0.12],
      ],
      style: { color: "green", weight: 2, fillOpacity: 0.4 },
      popup: "Sample service area polygon",
    },
  ];

  const circles: CircleData[] = [
    {
      id: 1,
      center: [51.508, -0.11],
      radius: 500,
      style: { color: "purple", fillOpacity: 0.3 },
      popup: "500m radius from center",
    },
  ];

  const handleMarkerClick = (marker: MarkerData) => {
    console.log("Marker clicked:", marker);
  };

  const handleMapClick = (latlng: LatLng) => {
    console.log("Map clicked at:", latlng);
  };

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-semibold">Advanced Map Example</h1>
      <AdvancedMap
        center={[51.505, -0.09]}
        zoom={13}
        markers={markers}
        polygons={polygons}
        circles={circles}
        onMarkerClick={handleMarkerClick}
        onMapClick={handleMapClick}
        enableClustering
        enableSearch
        enableControls
        style={{ height: "600px", width: "100%" }}
      />
    </div>
  );
}
