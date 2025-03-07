import "./App.css";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";

function App() {
    return (
        <div className="App">
            <h2 className="text-xl">Welcome to geojson maps</h2>
            <Map />
        </div>
    );
}

export default App;
