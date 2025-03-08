import "./App.css";
import { useState } from "react";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import Navbar from "./components/Navbar";

function App() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    return (
        <div className="App">
            <Navbar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
            <Map startDate={startDate} endDate={endDate} />
        </div>
    );
}

export default App;
