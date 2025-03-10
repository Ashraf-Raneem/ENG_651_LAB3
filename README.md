# React Leaflet GeoJSON Map

## 🚀 Features

This React application renders a **Leaflet map** that displays **GeoJSON data** retrieved from the City of Calgary API about contruction permits. The map includes the following functionalities:

### ✅ **1. Display GeoJSON Data on Map**

-   Uses **React Leaflet** to render **GeoJSON features** dynamically from an API.
-   **Custom icons** are applied to point features using `pointToLayer`.

### ✅ **2. Interactive Popups**

-   Clicking a marker **opens a popup** displaying **feature details (name, description)**.
-   The popup **fetches and displays feature properties** from the GeoJSON data.

### ✅ **3. Search Functionality**

-   A **search widget** allows users to filter GeoJSON data by sending a request to the API on certain date range.

### ✅ **4. Dynamic API Integration**

-   GeoJSON data is fetched from a **backend API** (replace `API_URL` with your endpoint).
-   Supports **query-based filtering** through API requests.

---

## 🛠 Technologies Used

-   **React** (Frontend Framework)
-   **React Leaflet** (Map rendering)
-   **Leaflet.js** (Mapping library)
-   **GeoJSON** (Geospatial data format)
-   **React Icons** (FontAwesome Icons in markers)

---

## 🔧 Configuration

Modify `API_URL` inside the `GeoJsonMap.js` file to point to your backend:

```tsx
const API_URL = "https://your-api-endpoint.com/api/geojson";
```

---

## 📜 Usage

-   Open the application.
-   The map loads and displays GeoJSON data fetched from the API.
-   Use the **search date range** to find permits for specific date range.
-   Click on a **marker** to view more details in a popup.

---

## 📜 License

This project is licensed under the **MIT License**.
