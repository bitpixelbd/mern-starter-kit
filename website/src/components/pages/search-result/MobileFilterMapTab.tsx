import SvgIcon from "@/components/SvgIcon";
import React, { useState } from "react";
import MobileFilterContent from "@/components/pages/search-result/MobileFilterContent";
import MobileMapContent from "@/components/pages/search-result/MobileMapContent";
export default function MobileFilterMapTab({
    onChangeCheckbox,
    onClickClear,
    onChangeRadioButton,
    applyQueryParamToSearch }) {
    const [isFilter, setIsFilter] = useState(false);
    const [isMap, setIsMap] = useState(false);

    const showFilter = () => {
        setIsFilter(true);
        // Disables Background Scrolling whilst the SideDrawer/Modal is open
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }
    const closeFilter = () => {
        setIsFilter(false);
        // Unsets Background Scrolling to use when SideDrawer/Modal is closed
        document.body.style.overflow = 'unset';
    }
    const showMap = (e) => {
        e.preventDefault();
        setIsMap((isMap) => !isMap)
        // // Disables Background Scrolling whilst the SideDrawer/Modal is open
        // if (typeof window != 'undefined' && window.document) {
        //     document.body.style.overflow = 'hidden';
        // }
    }
    const closeMap = () => {
        setIsMap(false);

        // // // Unsets Background Scrolling to use when SideDrawer/Modal is closed
        // document.body.style.overflow = 'unset';
    }
    return (
        <div className="mobile-tab-main-wrap flex-justify-Div">
            <div className="flex-justify-Div">
                <button className="tab-item-btn flex-div-8gap" onClick={showFilter}>
                    Filter
                    <SvgIcon name="filter_icon" className={''} />
                </button>
                {!isMap &&
                    <button className="tab-item-btn flex-div-8gap" onClick={showMap}>
                        <SvgIcon name="map_icon" className={''} />
                        Map
                    </button>
                }
                {isMap &&
                    <button className="tab-item-btn flex-div-8gap" onClick={closeMap}>
                        <SvgIcon name="search_list" className={''} />
                        List
                    </button>
                }
            </div>
            {isFilter &&
                <MobileFilterContent closeFilter={closeFilter}
                    onChangeCheckbox={onChangeCheckbox}
                    onClickClear={onClickClear}
                    onChangeRadioButton={onChangeRadioButton}
                    applyQueryParamToSearch={applyQueryParamToSearch}

                />
            }
            {isMap &&
                <MobileMapContent />
            }
        </div>
    );
}
