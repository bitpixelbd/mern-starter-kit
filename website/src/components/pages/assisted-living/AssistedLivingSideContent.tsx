import Image from "next/image";
import React from "react";
import TopSearchBar from "@/components/common/TopSearchBar";
import DifferenceBetween from "@/components/pages/assisted-living/DifferenceBetween";
import ListOfService from "@/components/pages/assisted-living/ListOfService";
import LivingCost from "@/components/pages/assisted-living/LivingCost";
import AnAssistedLiving from "@/components/pages/assisted-living/AnAssistedLiving";
import WhatAssistedLiving from "@/components/pages/assisted-living/WhatAssistedLiving";
import AssistedLivingFacility from "@/components/pages/assisted-living/AssistedLivingFacility";
import assisted_living_hero_img from "@/components/pages/assisted-living/assets/assisted_living_hero_img.png"
import DifferenceBetweenAssesTedLiving from "./DifferenceBetwieenSetions/DifferenceBetweenAssesTedLiving";

export default function AssistedLivingSideContent() {
  // @ts-ignore
    return (
      <div className="assisted-living-side-content">
          <h1 className="headline-medium">What is assisted living?</h1>
          <p className="body-regular">Navigating through the vast spectrum of senior living options, Assisted Living facilities stand out as a pivotal choice for families and seniors who are seeking a balanced blend of independence and assistance. Assisted living communities foster an environment where seniors can cherish their independence while also having access to the support and care they require.</p>
          <div className="key-characteristics">
              <h2 className="title-small">Key Characteristics of Assisted Living:</h2>
              <ol>
                  <li><p className="title-small-short"><b>Personalized Care:</b> Tailored care plans to meet individual needs, ensuring that each resident receives the right level of care and support.</p></li>
                  <li><p className="title-small-short"><b>Independence with a Safety Net:</b> Residents live in their own private apartments but have access to help, should they need it, with activities of daily living (ADLs), such as bathing, dressing, and medication management.</p></li>
                  <li><p className="title-small-short"><b>Social Opportunities:</b> A vibrant social environment that includes activities, events, and outings, offering numerous opportunities for socialization and engagement.</p></li>
                  <li><p className="title-small-short"><b>Dining Services:</b> Nutritious meals served in a communal dining area, facilitating both healthy living and social interaction.</p></li>
                  <li><p className="title-small-short"><b>Security:</b> Ensured safety with 24-hour staff availability and emergency response systems in place.</p></li>
              </ol>
          </div>
          <p className="body-regular">In essence, assisted living bridges the gap, offering a secure, supportive environment where residents can enjoy an abundance of social activities, with the reassurance that care is always available when needed. This option is ideal for seniors who may need some level of assistance with daily activities but do not require intensive medical care.</p>
          <div className="start-searching-care">
              <h2 className="headline-small">Start searching care homes</h2>
              <TopSearchBar />
          </div>
          <h1 className="headline-medium">Services  offered in assisted living</h1>
          <p className="body-regular">Families can anticipate a wide array of services designed to make the lives of seniors comfortable, secure, and enjoyable in Assisted Living communities. A cornerstone in the realm of senior living options, <b>Assisted Living</b> ensures residents receive steadfast support with Activities of Daily Living (ADLs), such as bathing, dressing, and medication management, through dedicated staff available around the clock. A pivotal aspect that sets assisted living apart is its personalized care approach, developing an individualized care plan that meticulously aligns with each resident’s unique needs and preferences.</p>
            <br/>
          <p className="body-regular">In addition to personal care, <b>Assisted Living</b> communities vibrantly facilitate social engagement and recreational activities, providing a lively, interactive environment that promotes both physical and mental well-being. Families can expect their loved ones to partake in a variety of activities, ranging from exercise classes and art workshops to social outings, all while being within a safe and supervised environment. Furthermore, these communities ensure that residents are offered nutritious meals, often with a variety of options to cater to different dietary needs and preferences. Safety is paramount in Assisted Living, and with 24/7 security and emergency systems, families can have peace of mind knowing their loved ones are in a secure, supportive environment that adeptly balances independent living with accessible care.</p>
          <br/>
          <ListOfService />
          <Image
              className="assisted_living_hero_img"
              src={assisted_living_hero_img}
              alt=""
          />
          {/* <DifferenceBetween /> */}
          <DifferenceBetweenAssesTedLiving/>
          <LivingCost />
          <AnAssistedLiving />
          <WhatAssistedLiving />
          <AssistedLivingFacility />
      </div>
  );
}
