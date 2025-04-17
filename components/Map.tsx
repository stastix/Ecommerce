"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

const position: LatLngExpression = [36.8859, 10.3245];

export default function CustomMap() {
  return (
    <div className="h-[300px] md:h-[500px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Mohamed Bairem Elkhames, La Marsa, 2070 <br /> Our Office
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
