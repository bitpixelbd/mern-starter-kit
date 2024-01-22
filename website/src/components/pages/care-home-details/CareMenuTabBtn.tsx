import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useDetails from "@/hooks/care-home-details/useDetails";
export default function CareMenuTabBtn({
  activeSection,
  navHeader,
  activeIndex,
}: any) {
  return (
    <div className="care-menu-tab-btn-wrap sticky-wrap-care-sidebar">
      {navHeader?.map((nav: any, i: number) => {
        return (
          <a
            key={`nav-${nav.headerID}`}
            href={`#${nav?.headerID}`}
            className={
              activeIndex == i
                ? "care-menu-btn care-menu-btn-active"
                : "care-menu-btn"
            }
          >
            {nav?.headerTitle}
          </a>
        );
      })}
    </div>
  );
}
