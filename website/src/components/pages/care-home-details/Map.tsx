import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import React from "react";
import { GOOGLE_MAP_API_KEY } from "@/config/config";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map({ nearBy, singleCareHome }: any) {
  const [map, setMap] = React.useState(null);
  const [selectedPlace, setSelectedPlace]: any = React.useState();
  const [centerInfo, setCenterInfo]: any = React.useState();
  const [libraries]: any = React.useState(["places"]);
  const center = {
    lat: +singleCareHome?.data?.lat,
    lng: +singleCareHome?.data?.lon,
  };

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    //set zoom level here
    map.setZoom(13);

    // setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const handleMarkerClick = (item: any) => {
    setCenterInfo(null);
    if (
      selectedPlace?.geometry?.location?.lat ===
      item?.geometry?.location?.lat &&
      selectedPlace?.geometry?.location?.lng === item?.geometry?.location?.lng
    ) {
      setSelectedPlace(null);
      return;
    }
    setSelectedPlace(item);
  };

  const getInfoContent = (item: any) => {
    return `<div style="max-width: 300px; ">
        
        <div style="padding: 10px;">
            <p><strong>Name:</strong> ${item.name}</p>
          <strong>Address:</strong> ${item.vicinity}
           
        </div>
    </div>`;
  };

  if (!singleCareHome?.data?.lat) return <></>;

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAP_API_KEY}
      libraries={libraries}
    // onLoad={onMapLoaded}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {nearBy ? (
          nearBy?.map((item: any, index: number) => {
            return (
              <MarkerF
                key={`${item?.geometry?.location?.lat}-${item?.geometry?.location?.lng}}`}
                position={item?.geometry?.location}
                icon={"http://maps.google.com/mapfiles/ms/icons/purple-dot.png"}
                onClick={() => {
                  handleMarkerClick(item);
                }}
              />
            );
          })
        ) : (
          <></>
        )}
        {selectedPlace && (
          <InfoWindowF
            position={{
              lat: selectedPlace?.geometry?.location?.lat,
              lng: selectedPlace?.geometry?.location?.lng,
            }}
            options={{
              content: getInfoContent(selectedPlace),
              pixelOffset: new google.maps.Size(0, -35),
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div></div>
          </InfoWindowF>
        )}
        {centerInfo && (
          <InfoWindowF
            position={{
              lat: centerInfo?.center?.lat,
              lng: centerInfo?.center?.lng,
            }}
            options={{
              content: getInfoContent(centerInfo),
              pixelOffset: new google.maps.Size(0, -35),
            }}
            onCloseClick={() => setCenterInfo(null)}
          >
            <div></div>
          </InfoWindowF>
        )}
        <MarkerF
          position={center}
          icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
          onClick={() => {
            setSelectedPlace(null);
            if (centerInfo) {
              setCenterInfo(null);
              return;
            }
            setCenterInfo({
              center,
              name: "Care Home",
              vicinity: "Queens New York",
            });
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
