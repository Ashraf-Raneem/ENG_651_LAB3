import { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { FaMapPin } from "react-icons/fa";
import L from "leaflet";

const API_URL = "https://data.calgary.ca/resource/c2es-76ed.geojson"; // Replace with actual API endpoint

const Map = () => {
    const [geoData, setGeoData] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchGeoJson();
    }, []);

    const fetchGeoJson = async (query = "") => {
        try {
            const response = await fetch(`${API_URL}`);
            const data = await response.json();
            setGeoData(data);
        } catch (error) {
            console.error("Error fetching GeoJSON data:", error);
        }
    };

    const handleSearch = () => {
        fetchGeoJson(search);
    };

    console.log(geoData);

    const onEachFeature = (feature, layer) => {
        if (feature.properties) {
            layer.bindPopup(
                `<div class="flex flex-col">
                    <span>Issue Date : ${feature.properties.issueddate}</span>
                    <span>Work class group : ${feature.properties.workclassgroup}</span>
                    <span>Contractor Name : ${feature.properties.contractorname}</span>
                    <span>Community Name : ${feature.properties.communityname}</span>
                    <span>Address : ${feature.properties.originaladdress}</span>
                </div`,
            );
        }
    };

    // ✅ Custom Leaflet DivIcon (Uses React Icons in a Div)
    const createCustomIcon = () => {
        return new L.DivIcon({
            className: "custom-div-icon",
            html: `
                <div style="
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    width: 20px; 
                    height: 20px; 
                    background: white; 
                    border-radius: 50%; 
                    border: 2px solid green; 
                    box-shadow: 0px 0px 5px rgba(0,0,0,0.5);
                ">
                <i class="fa fa-map-marker" style="color: green; font-size: 20px;"></i>
                </div>
      `,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
        });
    };

    const pointToLayer = (feature, latlng) => {
        return L.marker(latlng, { icon: createCustomIcon() });
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="flex gap-2 w-full max-w-md">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search locations..."
                />
                <button className="cursor-pointer" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <MapContainer
                center={[51.049999, -114.066666]}
                zoom={14}
                scrollWheelZoom={false}
                className="w-full"
                style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {geoData && <GeoJSON data={geoData} onEachFeature={onEachFeature} pointToLayer={pointToLayer} />}
            </MapContainer>
        </div>
    );
};

export default Map;
