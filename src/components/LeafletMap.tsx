import { memo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Leaflet from "leaflet";

import { TJobData, TJobPosition } from "../types/data-models";
import "leaflet/dist/leaflet.css";
import pinFile from "../assets/images/pin.svg";
interface Props {
  location: TJobPosition<number>;
  job: TJobData;
  position?: TJobPosition<number>;
}
function SelectedJobMarker({ location }: any) {
  const map = useMap();
  map.flyTo(location, map.getZoom());
  return null;
}
const pinIcon = Leaflet.icon({
  iconUrl: pinFile,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -75],
});
const LeafletMap = ({ location, job, position }: Props) => {
  return (
    <MapContainer
      center={[52.390741909089954, 4.937249840694807]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/naderjlyr/cl3m5g2a1005s15od3r2nfrr5/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFkZXJqbHlyIiwiYSI6ImNsM200YjhkMTAxODMzamxuOWJybTk5OXgifQ.Ros4f-cCXwiakGLffDXibQ"
      />
      {position && (
        <Marker icon={pinIcon} position={position}>
          <Popup closeButton={true}>
            <div>
              <h3>{job.job_title}</h3>
              <p>{job.organization_name}</p>
            </div>
          </Popup>
        </Marker>
      )}

      <SelectedJobMarker location={location} />
    </MapContainer>
  );
};

export default LeafletMap;
export const MemoizedMap = memo(LeafletMap, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});
