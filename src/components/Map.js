import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import SpiderfierLayer from "./SpidfierLayer";

const API_URL = "https://data.calgary.ca/resource/c2es-76ed.geojson"; // Replace with actual API endpoint

const Map = ({ startDate, endDate }) => {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetchGeoJson();
    }, []);

    useEffect(() => {
        if (startDate != null && endDate != null) {
            fetchGeoJson(true);
        }
    }, [startDate, endDate]);

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString("sv-SE");
    };

    const fetchGeoJson = async (query = "") => {
        let fetch_url = !query
            ? `${API_URL}`
            : `${API_URL}?$where=issueddate > '${formatDate(startDate)}' and issueddate < '${formatDate(endDate)}'`;
        try {
            const response = await fetch(fetch_url);
            const data = await response.json();
            setGeoData(data);
        } catch (error) {
            console.error("Error fetching GeoJSON data:", error);
        }
    };

    return (
        <div className="flex flex-col items-center z-0">
            <div className="absolute bottom-20 left-10 text-white z-20">
                <span className="rounded-xl text-sm bg-black border border-solid border-white p-2 px-6">
                    Showing {geoData && geoData.features.length} results
                </span>
            </div>
            <MapContainer
                center={[51.049999, -114.066666]}
                zoom={10}
                scrollWheelZoom={false}
                className="w-full z-0"
                style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {geoData && <SpiderfierLayer geoData={geoData} />}
            </MapContainer>
        </div>
    );
};

export default Map;
