import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Importar os ícones manualmente
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Componente Mapa para gerar o mapa com a localização do cliente
const Mapa = ({ coordenada_y, coordenada_x, distancia_km }) => {
  return (
    <MapContainer center={[coordenada_y, coordenada_x]} zoom={10} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[coordenada_y, coordenada_x]}>
        <Popup>
          Cliente <br />
          Distância até a empresa: {distancia_km} km
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Mapa;
