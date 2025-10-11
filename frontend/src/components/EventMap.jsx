import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet-images/marker-icon-2x.png",
  iconUrl: "/leaflet-images/marker-icon.png",
  shadowUrl: "/leaflet-images/marker-shadow.png",
});

const ChangeView = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      //map.flyTo(center, map.getZoom(), { animate: true, duration: 1.5 });
      map.flyTo(center, zoom, { animate: true, duration: 1.5 });
    }
  }, [center, zoom, map]);

  return null;
};

const EventMap = ({ events, mapCenter, onMarkerClick, title }) => {
  const [center, setCenter] = useState(mapCenter);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (mapCenter) {
      setCenter(mapCenter);
      setZoom(13);
    }
  }, [mapCenter]);

  const handleMarkerClick = (ev) => {
    onMarkerClick(ev);

    setCenter([ev.latitude, ev.longitude]);
    setZoom(15);
  };
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-96 w-full rounded-xl mt-4"
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {events.map((ev) => (
        <Marker
          key={ev.id}
          position={[ev.latitude, ev.longitude]}
          eventHandlers={{
            click: () => handleMarkerClick(ev),
          }}
        >
          <Popup>
            {ev.title}
            <br />
            {ev.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EventMap;
