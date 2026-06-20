import { useNavigate} from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCity } from "../contexts/CityProvider";
import { useGeolocation } from "../hooks/useGeoloaction";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
function Map() {
  const [mapPosition, setMapPosition] = useState([10, 10]);
  const [lat,lng]=useUrlPosition()
  const { cities } = useCity();
  const {
    isLoading: isLoadingGeo,
    position: positionGeo,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng],
  );
  useEffect(
    function () {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (positionGeo) setMapPosition([positionGeo.lat, positionGeo.lng]);
    },
    [positionGeo],
  );

  return (
    <div className={styles.mapContainer}>
      {!positionGeo && (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingGeo ? "Loading" : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangePosition position={mapPosition}></ChangePosition>
        <DetectClick></DetectClick>
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
