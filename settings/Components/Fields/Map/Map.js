/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet-fullscreen";
import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import markerIcon from "../../../assets/icons/marker-icon.png";
import "./style.scss";
// Nominatime URL (search text)
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
// Nominatim URL for reverse geocoding (lat and lon)
const REVERSE_URL = "https://nominatim.openstreetmap.org/reverse?";
// add icon with L(Leaflet)
const icon = L.icon({
  iconUrl: markerIcon,
  iconSize: [20, 30],
});

// function of SetView location
const ResetCenterView = ({ selectPosition, setSelectPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (selectPosition && selectPosition.fromSearch) {
      map.setView([selectPosition.lat, selectPosition.lon], 8)
    }

    const handleClick = (e) => {
      const { lat, lng } = e.latlng;
      fetch(`${REVERSE_URL}lat=${lat}&lon=${lng}&format=json`)
        .then((res) => res.json())
        .then((result) => {
          setSelectPosition({
            lat,
            lon: lng,
            display_name: result.display_name,
          });
        })
        .catch((error) => console.log("Error is:", error));
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [selectPosition, map, setSelectPosition]);
};

function Map({ value={}, onChange, defaultValue={} }) {
  const def = value || defaultValue;
  // { "address": "", "latitude": "30.14512718337613", "longitude": "34.45312500000001", "zoom": "2" }
  const { address, latitude, longitude, zoom = 10 } = def || {};
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [selectPosition, setSelectPosition] = useState(null);
  const locationSelection = [
    selectPosition?.lat,
    selectPosition?.lon,
  ];
  const mapInstance = useRef(null);
  const [position, setPosition] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);

        // Fetch address details
        fetch(`${REVERSE_URL}lat=${latitude}&lon=${longitude}&format=json`)
          .then((res) => res.json())
          .then((result) => {
            setSelectPosition({
              lat: latitude,
              lon: longitude,
              display_name: result.display_name,
            });
          })
          .catch((error) => console.log("Error is:", error));
      });
    }
  }, []);

  // handle search input change
  const handleChange = (value) => {
    setSearchText(value);
    onChange({ ...value, address: value })
    if (!value.trim()) {
      // Clear listPlace if the search field is empty
      setListPlace([]);
      return;
    }

    const params = {
      q: value,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const reqOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}${queryString}`, reqOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result && result.length > 0) {
          setListPlace(result);
        } else {
          setListPlace([]);
        }
      })
      .catch((error) => {
        setListPlace([]); // Ensure listPlace is cleared on error
      });
  };
  // Handle latitude and longitude change
  const handleLatLonChange = (lat, lon) => {
    // setLatitude(lat);
    onChange({ ...def, latitude: lat });
    onChange({ ...def, longitude: lon });
    const reqOptions = {
      method: "GET",
      redirect: "follow",
    };

    if (lat && lon) {
      fetch(`${REVERSE_URL}lat=${lat}&lon=${lon}&format=json`, reqOptions)
        .then((res) => res.json())
        .then((result) => {
          setSelectPosition(result);
          setSearchText(result.display_name);
        })
        .catch((error) => console.log("Error is:", error));
    }
  };

  //  Function of Full Screen
  const FullscreenControl = () => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;
      const fullscreenControl = L.control
        .fullscreen({
          position: "topleft",
          titleCancel: "Exit Fullscreen",
        })
        .addTo(map);

      // Change the icon using CSS
      const fullscreenButton = document.querySelector(
        ".leaflet-control-fullscreen-button"
      );
      if (fullscreenButton) {
        fullscreenButton.style.backgroundImage =
          'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9Uvyf1t_DCNvQ_-qklxJ5QYnk_G2W843sQ&s")';
        fullscreenButton.style.backgroundPosition = "center center";
        fullscreenButton.style.backgroundSize = "cover";
        fullscreenButton.title = "Full Screen";
      }
      map.on("fullscreenchange", () => {
        if (map?.isFullscreen()) {
          fullscreenButton.style.backgroundImage =
            'url("https://png.pngtree.com/element_our/png/20181205/fullscreen-vector-icon-png_256716.jpg")';
        } else {
          fullscreenButton.style.backgroundImage =
            'url("https://png.pngtree.com/element_our/png/20181205/fullscreen-vector-icon-png_256716.jpg")';
        }
      });

      return () => map.removeControl(fullscreenControl);
    }, [map]);

    return null;
  };
  // self location by map button
  const GeolocationControl = () => {
    const map = useMap();
    mapInstance.current = map;

    useEffect(() => {
      if (!map) return;
      const lc = L.control.locate({
        position: "topleft",
        drawCircle: true,
        keepCurrentZoomLevel: true,
        strings: {
          title: "Current Location",
          metersUnit: "meters",
        },
        locateOptions: {
          maxZoom: 20,
          enableHighAccuracy: true,
        },
      });
      lc.addTo(map);

      return () => map.removeControl(lc);
    }, [map]);
    return null;
  };

  return (
    <div className="bPl-map-main-wrapper">
      {/* Search field */}
      <div className="bPl-map-searchField-wrapper">
        <div className="bpl-inputField">
          <input
            type="text"
            value={address || searchText}
            onChange={(e) => handleChange(e.target.value)}
            className="bPl-map-inputField"
          />
        </div>
        {/* Show search address or location */}
        {listPlace && searchText && (
          <ul className="bPl-map-searchResult-wrapper">
            {searchText &&
              listPlace?.map((item) => (
                <li
                  key={item.place_id}
                  onClick={() => {
                    setListPlace("");
                    setSearchText(item.display_name);
                    onChange({ ...def, address: item.display_name })
                    setSelectPosition({ ...item, fromSearch: true });
                  }}
                  className="bPl-map-searchResult-name"
                >
                  {item.display_name}
                </li>
              ))}
          </ul>
        )}
      </div>
      {/* Map */}
      <div className="bPl-map-wrapper">
        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={position || [23.87076873182048, 90.3812974691391]}
          zoom={zoom}
          scrollWheelZoom={true}
          fadeAnimation={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=YEI95Jvk57zAEnNOTx8u"
          />
          {selectPosition && (
            <Marker
              // position={locationSelection}
              position={locationSelection}
              icon={icon}
              draggable={true}
              eventHandlers={{
                click: (e) => {
                  console.log(e)
                },
                dragend: (e) => {
                  const marker = e.target;
                  const position = marker.getLatLng();
                  onChange({
                    ...def,
                    latitude: position.lat,
                    longitude: position.lng,
                  });
                  setSelectPosition({
                    ...selectPosition,
                    lat: position.lat,
                    lon: position.lng,
                  });
                },
              }}
            ></Marker>
          )}
          <ResetCenterView
            selectPosition={selectPosition}
            setSelectPosition={val => {
              setSelectPosition(val);
              onChange({ ...value, latitude: val.lat, longitude: val.lon, address: val.display_name })
            }}
          />
          <FullscreenControl />
          <GeolocationControl />
        </MapContainer>
      </div>
      {/* lat and lon field */}
      <div className="bPl-lat-long-wrapper">
        <div className="bPl-lat-long-field">
          <label>Latitude</label>
          <div className="bpl-inputField">
            <input
              type="text"
              value={latitude ? latitude : selectPosition?.lat}
              onChange={(e) => handleLatLonChange(e.target.value, longitude)}
              className="bPl-map-inputField"
            />
          </div>
        </div>
        <div className="bPl-lat-long-field">
          <label>Longitude</label>
          <div className="bpl-inputField">
            <input
              type="text"
              value={longitude ? longitude : selectPosition?.lon}
              onChange={(e) => handleLatLonChange(latitude, e.target.value)}
              className="bPl-map-inputField"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
