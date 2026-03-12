import { useCallback, useEffect, useRef, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type {
  LatLng,
  LatLngExpression,
  LeafletMouseEvent,
  LocationEvent,
  PathOptions,
} from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type MarkerSize = "small" | "medium" | "large";

interface MarkerPopupData {
  title: string;
  content: string;
  image?: string;
}

export interface MarkerData {
  id?: string | number;
  position: LatLngExpression;
  color?: string;
  size?: MarkerSize;
  icon?: L.Icon;
  popup?: MarkerPopupData;
}

export interface PolygonData {
  id?: string | number;
  positions: LatLngExpression[] | LatLngExpression[][];
  style?: PathOptions;
  popup?: string;
}

export interface CircleData {
  id?: string | number;
  center: LatLngExpression;
  radius: number;
  style?: PathOptions;
  popup?: string;
}

export interface PolylineData {
  id?: string | number;
  positions: LatLngExpression[] | LatLngExpression[][];
  style?: PathOptions;
  popup?: string;
}

interface SearchResult {
  latLng: [number, number];
  name: string;
}

interface LayerState {
  openstreetmap: boolean;
  satellite: boolean;
  traffic: boolean;
}

export interface AdvancedMapProps {
  center?: LatLngExpression;
  zoom?: number;
  markers?: MarkerData[];
  polygons?: PolygonData[];
  circles?: CircleData[];
  polylines?: PolylineData[];
  onMarkerClick?: (marker: MarkerData) => void;
  onMapClick?: (latlng: LatLng) => void;
  enableClustering?: boolean;
  enableSearch?: boolean;
  enableControls?: boolean;
  enableDrawing?: boolean;
  mapLayers?: LayerState;
  className?: string;
  style?: React.CSSProperties;
}

const iconDefaultProto = L.Icon.Default.prototype as L.Icon.Default & {
  _getIconUrl?: unknown;
};
delete iconDefaultProto._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const createCustomIcon = (color = "blue", size: MarkerSize = "medium"): L.Icon => {
  const sizes: Record<MarkerSize, [number, number]> = {
    small: [20, 32],
    medium: [25, 41],
    large: [30, 50],
  };

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: sizes[size],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const MapEvents = ({
  onMapClick,
  onLocationFound,
}: {
  onMapClick?: (latlng: LatLng) => void;
  onLocationFound?: (latlng: LatLng) => void;
}) => {
  const map = useMapEvents({
    click: (e: LeafletMouseEvent) => {
      onMapClick?.(e.latlng);
    },
    locationfound: (e: LocationEvent) => {
      onLocationFound?.(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
};

const CustomControls = ({
  onLocate,
  onToggleLayer,
}: {
  onLocate: () => void;
  onToggleLayer: (layer: keyof LayerState) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    const control = L.control({ position: "topright" });

    control.onAdd = () => {
      const div = L.DomUtil.create("div", "custom-controls");
      div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
          <button id="locate-btn" style="margin: 2px; padding: 8px; border: none; border-radius: 3px; cursor: pointer;">Locate Me</button>
          <button id="satellite-btn" style="margin: 2px; padding: 8px; border: none; border-radius: 3px; cursor: pointer;">Satellite</button>
          <button id="traffic-btn" style="margin: 2px; padding: 8px; border: none; border-radius: 3px; cursor: pointer;">Traffic</button>
        </div>
      `;

      L.DomEvent.disableClickPropagation(div);

      const locateBtn = div.querySelector("#locate-btn") as HTMLButtonElement | null;
      const satelliteBtn = div.querySelector("#satellite-btn") as HTMLButtonElement | null;
      const trafficBtn = div.querySelector("#traffic-btn") as HTMLButtonElement | null;

      locateBtn?.addEventListener("click", onLocate);
      satelliteBtn?.addEventListener("click", () => onToggleLayer("satellite"));
      trafficBtn?.addEventListener("click", () => onToggleLayer("traffic"));

      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, onLocate, onToggleLayer]);

  return null;
};

const SearchControl = ({
  onSearch,
}: {
  onSearch?: (result: SearchResult) => void;
}) => {
  const queryRef = useRef("");
  const map = useMap();

  const handleSearch = useCallback(async () => {
    const query = queryRef.current.trim();
    if (!query) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const results = (await response.json()) as Array<{
        lat: string;
        lon: string;
        display_name: string;
      }>;

      if (results.length > 0) {
        const { lat, lon, display_name } = results[0];
        const latLng: [number, number] = [parseFloat(lat), parseFloat(lon)];
        map.flyTo(latLng, 13);
        onSearch?.({ latLng, name: display_name });
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  }, [map, onSearch]);

  useEffect(() => {
    const control = L.control({ position: "topleft" });

    control.onAdd = () => {
      const div = L.DomUtil.create("div", "search-control");
      div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); display: flex; gap: 5px;">
          <input
            id="search-input"
            type="text"
            placeholder="Search places..."
            style="padding: 8px; border: 1px solid #ddd; border-radius: 3px; width: 200px;"
          />
          <button
            id="search-btn"
            style="padding: 8px 12px; border: none; border-radius: 3px; cursor: pointer; background: #007bff; color: white;"
          >
            Search
          </button>
        </div>
      `;

      L.DomEvent.disableClickPropagation(div);

      const input = div.querySelector("#search-input") as HTMLInputElement | null;
      const button = div.querySelector("#search-btn") as HTMLButtonElement | null;

      const onInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        queryRef.current = target.value;
      };
      const onEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter") void handleSearch();
      };
      const onClick = () => {
        void handleSearch();
      };

      input?.addEventListener("input", onInput);
      input?.addEventListener("keypress", onEnter);
      button?.addEventListener("click", onClick);

      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, handleSearch]);

  return null;
};

export const AdvancedMap = ({
  center = [51.505, -0.09],
  zoom = 13,
  markers = [],
  polygons = [],
  circles = [],
  polylines = [],
  onMarkerClick,
  onMapClick,
  enableClustering = true,
  enableSearch = true,
  enableControls = true,
  enableDrawing = false,
  mapLayers = {
    openstreetmap: true,
    satellite: false,
    traffic: false,
  },
  className = "",
  style = { height: "500px", width: "100%" },
}: AdvancedMapProps) => {
  const [currentLayers, setCurrentLayers] = useState<LayerState>(mapLayers);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [clickedLocation, setClickedLocation] = useState<LatLng | null>(null);

  const handleToggleLayer = useCallback((layerType: keyof LayerState) => {
    setCurrentLayers((prev) => ({
      ...prev,
      [layerType]: !prev[layerType],
    }));
  }, []);

  const handleLocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const handleMapClick = useCallback(
    (latlng: LatLng) => {
      setClickedLocation(latlng);
      onMapClick?.(latlng);
    },
    [onMapClick]
  );

  const handleSearch = useCallback((result: SearchResult) => {
    setSearchResult(result);
  }, []);

  return (
    <div className={`advanced-map ${className}`} style={style}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
        {currentLayers.openstreetmap && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        {currentLayers.satellite && (
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        <MapEvents onMapClick={handleMapClick} onLocationFound={(latlng) => setUserLocation([latlng.lat, latlng.lng])} />
        {enableSearch && <SearchControl onSearch={handleSearch} />}
        {enableControls && <CustomControls onLocate={handleLocate} onToggleLayer={handleToggleLayer} />}

        {enableClustering ? (
          <MarkerClusterGroup>
            {markers.map((marker, index) => (
              <Marker
                key={marker.id ?? index}
                position={marker.position}
                icon={marker.icon ?? createCustomIcon(marker.color, marker.size)}
                eventHandlers={{
                  click: () => onMarkerClick?.(marker),
                }}
              >
                {marker.popup && (
                  <Popup>
                    <div>
                      <h3>{marker.popup.title}</h3>
                      <p>{marker.popup.content}</p>
                      {marker.popup.image && (
                        <img
                          src={marker.popup.image}
                          alt={marker.popup.title}
                          style={{ maxWidth: "200px", height: "auto" }}
                        />
                      )}
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
          </MarkerClusterGroup>
        ) : (
          markers.map((marker, index) => (
            <Marker
              key={marker.id ?? index}
              position={marker.position}
              icon={marker.icon ?? createCustomIcon(marker.color, marker.size)}
              eventHandlers={{
                click: () => onMarkerClick?.(marker),
              }}
            >
              {marker.popup && (
                <Popup>
                  <div>
                    <h3>{marker.popup.title}</h3>
                    <p>{marker.popup.content}</p>
                    {marker.popup.image && (
                      <img
                        src={marker.popup.image}
                        alt={marker.popup.title}
                        style={{ maxWidth: "200px", height: "auto" }}
                      />
                    )}
                  </div>
                </Popup>
              )}
            </Marker>
          ))
        )}

        {userLocation && (
          <Marker position={userLocation} icon={createCustomIcon("red", "medium")}>
            <Popup>Your current location</Popup>
          </Marker>
        )}

        {searchResult && (
          <Marker position={searchResult.latLng} icon={createCustomIcon("green", "large")}>
            <Popup>{searchResult.name}</Popup>
          </Marker>
        )}

        {clickedLocation && (
          <Marker position={[clickedLocation.lat, clickedLocation.lng]} icon={createCustomIcon("orange", "small")}>
            <Popup>
              Lat: {clickedLocation.lat.toFixed(6)}
              <br />
              Lng: {clickedLocation.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}

        {polygons.map((polygon, index) => (
          <Polygon
            key={polygon.id ?? index}
            positions={polygon.positions}
            pathOptions={polygon.style ?? { color: "purple", weight: 2, fillOpacity: 0.3 }}
          >
            {polygon.popup && <Popup>{polygon.popup}</Popup>}
          </Polygon>
        ))}

        {circles.map((circle, index) => (
          <Circle
            key={circle.id ?? index}
            center={circle.center}
            radius={circle.radius}
            pathOptions={circle.style ?? { color: "blue", weight: 2, fillOpacity: 0.2 }}
          >
            {circle.popup && <Popup>{circle.popup}</Popup>}
          </Circle>
        ))}

        {polylines.map((polyline, index) => (
          <Polyline
            key={polyline.id ?? index}
            positions={polyline.positions}
            pathOptions={polyline.style ?? { color: "red", weight: 3 }}
          >
            {polyline.popup && <Popup>{polyline.popup}</Popup>}
          </Polyline>
        ))}
      </MapContainer>
      {enableDrawing && null}
    </div>
  );
};
