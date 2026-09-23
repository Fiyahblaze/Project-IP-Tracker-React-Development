import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locationIconUrl from "../assets/images/icon-location.svg";

interface MapProps {
  latitude: number;
  longitude: number;
}

function Map({ latitude, longitude }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    const locationIcon = L.icon({
      iconUrl: locationIconUrl,
      iconSize: [46, 56],
      iconAnchor: [23, 56],
    });

    const map = L.map(mapContainerRef.current).setView(
      [20, 0],
      2,
    );

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          "&copy; OpenStreetMap contributors &copy; CARTO",
      },
    ).addTo(map);

    const marker = L.marker([20, 0], {
      icon: locationIcon,
    }).addTo(map);

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current) {
      return;
    }

    const coordinates: L.LatLngExpression = [
      latitude,
      longitude,
    ];

    mapRef.current.setView(coordinates, 13);
    markerRef.current.setLatLng(coordinates);
  }, [latitude, longitude]);

  return (
    <section className="map-section" aria-label="IP location map">
      <div
        ref={mapContainerRef}
        id="map"
        aria-label={`Map showing coordinates ${latitude}, ${longitude}`}
      />
    </section>
  );
}

export default Map;