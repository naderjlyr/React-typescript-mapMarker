import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
type Props = {};

const LeafletMap = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/naderjlyr/cl3m5g2a1005s15od3r2nfrr5/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFkZXJqbHlyIiwiYSI6ImNsM200YjhkMTAxODMzamxuOWJybTk5OXgifQ.Ros4f-cCXwiakGLffDXibQ"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
