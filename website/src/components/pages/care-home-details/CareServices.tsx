import React, { useRef } from "react";
import SvgIcon from "@/components/SvgIcon";
import CareServiceItem from "@/components/common/CareServiceItem";
export default function CareServices({ observerRefs, _ref, singleCareHome }: any) {
  // console.log("single care serv", singleCareHome);
  return (
    <div className="care-services-wrap" id="care-services-section" ref={_ref}>
      <h1 className="headline-large">Care Services Offered</h1>
      <div className="care-item-wrapper">
        {/*Item single component*/}

        {singleCareHome?.data?.services?.map(service => <CareServiceItem key={service.id} service={service} />)}

        {/* <CareServiceItem /> */}

        <div className="care-services-item">
          <SvgIcon name="Care_Types_C" className={""} />
          <h2 className="title-large">Assisted Care</h2>
          <p className="body-medium">
            Supportive community for seniors needing assistance with daily
            activities, offering an active and engaging environment.
          </p>
        </div>
        <div className="care-services-item">
          <SvgIcon name="Care_Types_B" className={""} />
          <h2 className="title-large">Assisted Care</h2>
          <p className="body-medium">
            Ideal for active older adults downsizing to a retirement community
            while maintaining their independence.
          </p>
        </div>
        <div className="care-services-item">
          <SvgIcon name="Care_Types_A" className={""} />
          <h2 className="title-large">Assisted Care</h2>
          <p className="body-medium">
            Comprehensive care and medical support for seniors with complex
            healthcare needs.
          </p>
        </div>
        <div className="care-services-item">
          <SvgIcon name="Care_Types_D" className={""} />
          <h2 className="title-large">Assisted Care</h2>
          <p className="body-medium">
            Secured community providing quality life and engagement support for
            those with dementia.
          </p>
        </div>
      </div>
    </div>
  );
}
