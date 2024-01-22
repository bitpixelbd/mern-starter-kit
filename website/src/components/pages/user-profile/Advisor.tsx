import React, {useState} from "react";
import SvgIcon from "@/components/SvgIcon";

export default function Advisor() {
    return (
      <div className="user-advisor-inner">
          <SvgIcon name="demo_avatar" className={'advisor_avatar'}/>
          <div className="advisor-details">
              <div className="advisor-details-head flex-justify-Div">
                  <div>
                      <h3 className="headline-small">Maria Evans</h3>
                      <h5 className="label-large">Senior Places Advisor</h5>
                  </div>
                  <button className="primary-short-btn">
                      Send Message
                  </button>
              </div>
              <div className="advices-details-bottom flex-div-single">
                  <div>
                      <h6 className="label-small">Families Helped</h6>
                      <h4 className="title-small">30</h4>
                  </div>
                  <div>
                      <h6 className="label-small">Experience</h6>
                      <h4 className="title-small">5 Years</h4>
                  </div>
                  <div>
                      <h6 className="label-small">Operating in</h6>
                      <h4 className="title-small">Huntington beach, CA</h4>
                  </div>
              </div>
          </div>
      </div>
  );
}
