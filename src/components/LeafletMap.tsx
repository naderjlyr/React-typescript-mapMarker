import { memo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Leaflet from "leaflet";
import { selectTargetJob } from "../features/store";
import "leaflet/dist/leaflet.css";
import pinFile from "../assets/images/pin.svg";
import { useSelector } from "react-redux";

const LeafletMap = () => {
  const chosenPosition = useSelector(selectTargetJob);

  const SelectedJobMarker = (location: any) => {
    const map = useMap();
    map.flyTo([chosenPosition.lat, chosenPosition.lng], map.getZoom());
    return null;
  };
  const pinIcon = Leaflet.icon({
    iconUrl: pinFile,
    iconSize: [50, 50],
    iconAnchor: [29, 68],
    popupAnchor: [0, -75],
  });

  return (
    <MapContainer
      center={[chosenPosition.lat, chosenPosition.lng]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ display: "flex", width: "100%", height: "100%" }}
    >
      <TileLayer url="https://api.mapbox.com/styles/v1/naderjlyr/cl3m5g2a1005s15od3r2nfrr5/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFkZXJqbHlyIiwiYSI6ImNsM200YjhkMTAxODMzamxuOWJybTk5OXgifQ.Ros4f-cCXwiakGLffDXibQ" />
      {
        <Marker
          icon={pinIcon}
          position={[chosenPosition.lat, chosenPosition.lng]}
        >
          <Popup closeButton={true}>
            <div>
              <h3>{chosenPosition.job_title}</h3>
              <p>{chosenPosition.organization_name}</p>
              <p>{chosenPosition.location_coordinates}</p>
            </div>
          </Popup>
        </Marker>
      }

      <SelectedJobMarker location={[chosenPosition.lat, chosenPosition.lng]} />
    </MapContainer>
  );
};

export default LeafletMap;
export const MemoizedMap = memo(LeafletMap, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});
