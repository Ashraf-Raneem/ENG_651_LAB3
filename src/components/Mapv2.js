import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as L from "leaflet";
import "mapbox-gl-leaflet";

const Mapv2 = () => {
    const mapRefContainer = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return; // Ensure the container exists before initializing the map

        mapRef.current = L.map(mapRefContainer.current).setView([51.0447, -114.0719], 10);

        // Define Mapbox layers
        const streetsLayer = L.mapboxGL({
            accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
            style: "mapbox://styles/mapbox/standard",
        });

        const trafficlayer = L.mapboxGL({
            accessToken: process.env.REACT_APP_MAP_ACCESS_TOKEN,
            style: process.env.REACT_APP_STYLE_URL,
        });

        trafficlayer.addTo(mapRef.current);

        L.control
            .layers(
                {
                    "Streets View": streetsLayer,
                    "Traffic View": trafficlayer,
                },
                {},
            )
            .addTo(mapRef.current);
    }, []);

    return <div ref={mapRefContainer} style={{ height: "100vh", width: "100%" }} />;
};

export default Mapv2;
