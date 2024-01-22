import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  OverlayView,
  OverlayViewF,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import locationImg from "./assets/svgLocation.svg";
import { useSelector } from "react-redux";
import General from "../search-result/assets/User Profile/Icons/General.png";
const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function SimpleMap({ items, clickedItem, setSearchItems, setMobileActiveItem }: any) {
  const [myItems, setMyItems] = useState(items);
  const [selectLat, setSelectLat] = useState(clickedItem);
  const [libraries]: any = React.useState(["places"]);
  const [centerInfo, setCenterInfo]: any = React.useState();
  const [map, setMap] = React.useState(null);
  const [activeItem, setActiveItem]: any = React.useState();

  const userLocation = useSelector((state: any) => state.auth.userLocation);
  const activeCareHome = useSelector((state: any) => state.carehome.activeItem);

  useEffect(() => {
    //if (typeof clickedItem.lat !== 'undefined'){
    setSelectLat(clickedItem.lat);
    //filterItem(clickedItem.lat)
    //}
  }, [selectLat, myItems]);

  const defaultProps = {
    //23.776244207077454, 90.40609144336469
    //23.807169850198193, 90.36901967160192
    center: {
      lat: items[0]?.lat ? +items[0]?.lat : userLocation?.lat,
      lng: items[0]?.lng ? +items[0]?.lng : userLocation?.lng,
    },
    // userLocation?.lat && userLocation?.lng
    //   ? userLocation
    //   : {
    //       lat: +items[0]?.lat,
    //       lng: +items[0]?.lon,
    //     },
    zoom: 11,
  };

  function filterItem() {
    alert(selectLat);
    setMyItems(
      myItems.map((item: { lat: any }) => {
        if (item.lat == selectLat) {
          return { ...item, selected: "yes" };
        } else {
          return item;
        }
      })
    );
  }
  const clickOnMarker = (item: any) => {
    const _searchItems = [item, ...items.filter((i: any) => i.id != item.id)];
    setSearchItems(_searchItems);
    setActiveItem(item);
    if (setMobileActiveItem) {
      setMobileActiveItem(item);
    }
  };

  const onLoad = React.useCallback(
    function callback(map: any) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      // console.log("defaultProps?.center: ", defaultProps?.center);

      // const bounds = new window.google.maps.LatLngBounds(defaultProps?.center);
      // map.fitBounds(bounds);
      //set zoom level here
      map.setZoom(12);

      // setMap(map);
    },
    [defaultProps?.center]
  );

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const getInfoContent = (item: any) => {
    if (setMobileActiveItem) {
      return '';
    }
    return `<div style=" " class="overlay-wrap">
        <img class="main-image" src=${item?.feature_image} alt="">
        
        <div style="padding: 10px;">
            <h3>${item?.name}</h3>
            <div class="adr">
              <img
                className={"locate-icon"}
                src={General}
                alt=""
              />
              <p>${item?.address}</p>
            </div>
            
        
          <a href="/care-homes/${item?.slug}" style="padding: 8px;" target="_blank">View Details</a>
           
        </div>
    </div>`;
  };

  return (
    // Important! Always set the container height explicitly

    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultProps.center}
      zoom={2}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {(activeItem && !setMobileActiveItem) && (
        <InfoWindowF
          position={{
            lat: +activeItem?.lat,
            lng: +activeItem?.lng,
          }}
          options={{
            content: getInfoContent(activeItem),
            pixelOffset: new google.maps.Size(0, -35),
          }}
          onCloseClick={() => setActiveItem(null)}
        >
          <div></div>
        </InfoWindowF>
      )}

      {items?.map((item: any) => {
        return (
          <OverlayViewF
            key={item.id}
            position={
              item.lat && item.lng
                ? { lat: item.lat, lng: item.lng }
                : defaultProps.center
            }
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -width / 2,
              y: -height,
            })}
            zIndex={item.id == activeItem?.id ? 200 : 100}
          >
            <div
              className={
                activeItem && activeItem.id === item.id
                  ? "priceTagActive"
                  : "priceTag"
              }
              onClick={() => {
                clickOnMarker(item);
              }}
            >
              {`$${item.price_start} - $${item.price_end}`}
            </div>
          </OverlayViewF>
        );
      })}
    </GoogleMap>
    // <div style={{ height: "100vh", width: "100%" }}>
    //   <button onClick={filterItem}>Click</button>
    // </div>
  );
}
