import { useRef } from "react";
import { GeoJSON } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

const SpiderfierLayer = ({ geoData }) => {
    const clusterGroupRef = useRef(null);

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
        <MarkerClusterGroup ref={clusterGroupRef}>
            <GeoJSON
                key={JSON.stringify(geoData)}
                data={geoData}
                onEachFeature={onEachFeature}
                pointToLayer={pointToLayer}
            />
        </MarkerClusterGroup>
    );
};

export default SpiderfierLayer;
