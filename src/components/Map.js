import { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { FaMapPin } from "react-icons/fa";
import L from "leaflet";

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
                    width: 10px; 
                    height: 10px; 
                    background: grey; 
                    border-radius: 50%; 
                    border: 2px solid white; 
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
                {geoData && (
                    <GeoJSON
                        key={JSON.stringify(geoData)}
                        data={geoData}
                        onEachFeature={onEachFeature}
                        pointToLayer={pointToLayer}
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default Map;
