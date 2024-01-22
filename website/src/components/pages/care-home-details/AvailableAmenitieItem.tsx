import AvailableAmenitieItemContent from "@/components/common/AvailableAmenitieItemContent";
import AvailableContentItemSingle from "@/components/common/AvailableContentItemSingle";
import { ITEM_CAREHOME_DETAILS, ITEM_COMPARISON } from "@/config/constants";
import React, { useState } from 'react';
export default function AvailableAmenitieItem({ amenity, index, careHomes, ...props }) {
    const [page, setPage] = useState<string>(props?.page)

    const getAmenities = (careHome) => {
        const homeAmenities = []
        careHome?.amenity?.map(item => {
            item.items?.map(i => homeAmenities.push(i.name))
        });

        return amenity?.amenities?.map(item => {
            const active = homeAmenities?.find(i => item.name === i);

            return <AvailableContentItemSingle
                key={item?.id}
                icon={item?.icon}
                name={item?.name}
                isInactive={!active}
            />
        }
        )
    }


    return (
        <div className="available-amenities-item-wrapper">
            <div className="accordion-item">
                <h2 className="accordion-header" id={index}>
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index}`}
                        aria-expanded="true"
                        aria-controls={`collapse-${index}`}
                    >
                        {page === ITEM_COMPARISON && amenity?.group_name}
                        {page === ITEM_CAREHOME_DETAILS && props?.groupName}

                    </button>
                </h2>
                <div
                    id={`collapse-${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading-${index}`}
                    data-bs-parent="#accordionExample"
                >
                    <div className="accordion-body">
                        <div className="available-amenities-item-content">

                            {page === ITEM_COMPARISON && careHomes?.map(home => {
                                return (
                                    <di>
                                        {
                                            getAmenities(home)
                                        }
                                    </di>
                                )
                            })}

                            {
                                page === ITEM_CAREHOME_DETAILS &&

                                props?.amenitiesArray?.map(item =>
                                    <AvailableContentItemSingle
                                        key={item?.id}
                                        icon={item.icon}
                                        name={item.name}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
