import React from "react";

export default function AssistedLivingSideBar() {
  return (
      <div className="assisted-living-side-bar">
            <div className="sidebar-wrapper">
                <h2 className="title-small">What is assisted living?</h2>
            </div>
          <div className="sidebar-wrapper">
                <h2 className="title-small">Services  offered in <br/>assisted living</h2>
          </div>
          <div className="sidebar-wrapper">
                <h2 className="title-small">Difference between assisted living <br/> and other senior cares</h2>
              <ul>
                  <li><p className="label-large">Assisted Living vs. Independent Living</p></li>
                  <li><p className="label-large">Assisted Living vs. Nursing Homes</p></li>
                  <li><p className="label-large">Assisted Living vs. Memory Care</p></li>
                  <li><p className="label-large">Assisted Living vs. Home Care</p></li>
              </ul>
          </div>
          <div className="sidebar-wrapper">
                <h2 className="title-small">How much does assisted living <br/> cost?</h2>
              <ul>
                  <li><p className="label-large">Financial Assistance for Assisted Living</p></li>
              </ul>
          </div>
          <div className="sidebar-wrapper">
                <h2 className="title-small">What are some key signs that is it <br/> time for assisted living?</h2>
              <ul>
                  <li><p className="label-large">What are some key signs that is it time for <br/> assisted living?</p></li>
              </ul>
          </div>
          <div className="sidebar-wrapper">
                <h2 className="title-small">What should I look for in an Assisted <br/>Living?</h2>
          </div>
          <div className="sidebar-wrapper">
                <h2 className="title-small">How do I choose an assisted living <br/> facility?</h2>
          </div>
      </div>
  );
}
