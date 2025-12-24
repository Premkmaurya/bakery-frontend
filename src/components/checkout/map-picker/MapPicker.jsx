import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapPicker.scss";

const LocationMarker = ({ onChange }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onChange({ lat, lng });
      console.log("Selected location:", lat, lng);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const MapPicker = ({ onSelect, onClose }) => {
  return (
    <div className="map-container">
      <MapContainer
        center={[27.3947983525672, 80.12879233754377]}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LocationMarker onChange={onSelect} />
      </MapContainer>

      <div className="map-actions">
        <button className="confirm-btn" onClick={onClose}>Confirm Location</button>
      </div>
    </div>
  );
};

export default MapPicker;
