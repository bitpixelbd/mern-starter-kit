import React from "react";
import AssistedLivingSideBar from "@/components/pages/assisted-living/AssistedLivingSideBar";
import AssistedLivingSideContent from "@/components/pages/assisted-living/AssistedLivingSideContent";
import SvgIcon from "@/components/SvgIcon";
import TopSearchBar from "@/components/common/TopSearchBar";
import Image from "next/image";
import phone from "@/components/pages/home/assets/phone.svg";
import Rectangle23 from "@/components/pages/assisted-living/assets/Rectangle23.png";
import Rectangle34 from "@/components/pages/assisted-living/assets/Rectangle34.png";

export default function WhatAssistedLiving() {
  return (
      <div className="difference-between-inner">
          <h1 className="headline-medium">What should I look for in an Assisted Living?</h1>
          <h5 className="body-regular">Choosing an Assisted Living community for a loved one encompasses several compassionate considerations, seeking to weave their needs, comfort, and preferences into a harmonious living experience. Here are aspects you may wish to gently explore as you navigate this path:</h5>
          <ol className="an-assisted-living-ol">
              <li>
                  <p className="title-small">Caring Staff:</p>
                  <ul>
                      <li className="title-small-short">Observe staff interactions with residents to gauge genuine care and respect.</li>
                      <li className="title-small-short">Explore staff training and qualifications to ensure expert care.</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Living Spaces:</p>
                  <ul>
                      <li className="title-small-short">Consider the comfort, accessibility, and safety of living spaces and common areas.</li>
                      <li className="title-small-short">Ensure private spaces can be personalized to create a homely ambiance.</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Safety & Accessibility:</p>
                  <ul>
                      <li className="title-small-short">Assess the safety features within rooms and throughout the community.</li>
                      <li className="title-small-short">Ensure ease of mobility and accessibility, particularly for those with physical limitations.</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Quality of Life:</p>
                  <ul>
                      <li className="title-small-short">Observe the happiness and engagement levels of current residents.</li>
                      <li className="title-small-short">Explore the calendar of activities and social opportunities available.</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Nutrition & Dining:</p>
                  <ul>
                      <li className="title-small-short">Ensure meals are nutritious, appetizing, and cater to dietary needs.</li>
                      <li className="title-small-short">Explore the dining environment and if it’s a pleasant, sociable experience.</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Healthcare Services:</p>
                  <ul>
                      <li className="title-small-short">Investigate the range and quality of healthcare services provided.</li>
                      <li className="title-small-short">Ensure medical care, medications, and specialized healthcare are aptly addressed.</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Family Involvement:</p>
                  <ul>
                      <li className="title-small-short">Assess how the community involves families in care and decision-making.</li>
                      <li className="title-small-short">Ensure communication channels are open and frequent between staff and families.</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Cost & Contract Clarity:</p>
                  <ul>
                      <li className="title-small-short">Understand the cost structure, what’s included, and any additional expenses.</li>
                      <li className="title-small-short">Ensure contracts are clear, with transparent policies regarding changes in care needs.</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Reviews & Recommendations:</p>
                  <ul>
                      <li className="title-small-short">Explore reviews and seek recommendations from current residents’ families.</li>
                      <li className="title-small-short">Visit various communities, if possible, to glean a firsthand perspective.</li>
                  </ul>
              </li>
          </ol>
          <h5 className="body-regular">Embarking on the quest for an assisted living community is a journey molded with affection, a desire for enriched living experiences for your loved one, and a sanctuary where their uniqueness is celebrated. Ensuring their new home is not only supportive and safe but also vibrant and enriching, is a beautiful expression of your care and deep familial bonds.</h5>

      </div>
  );
}
