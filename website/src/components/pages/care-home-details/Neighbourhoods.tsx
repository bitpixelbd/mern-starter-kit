import React from "react";
import Map from "./Map";
import SvgIcon from "@/components/SvgIcon";
import useDetails from "@/hooks/care-home-details/useDetails";
import { GOOGLE_MAP_NEARBY_RADIUS } from "@/config/config";

export default function Neighbourhoods({
  observerRefs,
  _ref,
  singleCareHome,
}: any) {
  const [selected, setSelected] = React.useState(""); // ["bank", "hospital", "pharmacy", "restaurant", "shopping_mall"

  const { useSearchNearByPlaces } = useDetails();

  const { data: nearBy, isLoading }: any = useSearchNearByPlaces({
    type: selected,
    lat: singleCareHome?.data?.lat,
    lng: singleCareHome?.data?.lon,
    radius: GOOGLE_MAP_NEARBY_RADIUS,
  });

  const handleNearByPlace = (place: any) => {
    setSelected(place.name);
  };

  const tabBtns = [
    {
      title: "Bank",
      name: "bank",
      icon: "bank_Icons_primary",
    },
    {
      title: "Hospital",
      name: "hospital",
      icon: "hospital_primary_Icons",
    },
    {
      title: "Pharmacy",
      name: "pharmacy",
      icon: "pharmacy_primary_Icons",
    },
    {
      title: "Restaurant",
      name: "restaurant",
      icon: "resturant_primary_Icons",
    },
    {
      title: "Shopping",
      name: "shopping_mall",
      icon: "shoping_primary_Icons",
    },
  ];
  return (
    <div
      className="neighbourhoods-wrapper"
      id="neighbourhoods-section"
      ref={_ref}
    >
      <h1 className="headline-large">Neighbourhoods</h1>
      <p className="title-medium">
        Expand the map to its full extent for a comprehensive view of everything in the vicinity.
      </p>
      <div className="neighbourhood-tab-btn">
        {tabBtns?.map((item, index) => (
          <button
            key={item.name}
            onClick={(e) => {
              e.preventDefault();
              handleNearByPlace({ name: item.name });
            }}
            className={
              item.name == selected
                ? "tab-item-btn flex-div-8gap tab-item-btn-active"
                : "tab-item-btn flex-div-8gap"
            }
          >
            <SvgIcon name={`${item.icon}`} className={""} />
            {item.title}
          </button>
        ))}
      </div>
      <div className="neighbourhood-tab-map">
        {/* <Image src={image53} alt="" /> */}
        <Map nearBy={nearBy?.data ?? []} singleCareHome={singleCareHome} />
      </div>
    </div>
  );
}
